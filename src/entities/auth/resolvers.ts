import { model } from 'mongoose';
import { verify as jwtVerify } from 'jsonwebtoken';
import { compare as bcryptCompare } from 'bcryptjs';

import type { Resolvers, RegisterResult, LoginResult, RefreshResult, LogoutResult } from '@generated/types';
import { clearRefreshToken, findUser, generateToken, sendRefreshToken } from '@services/auth.service';
import { log } from '@services/logger.service';
import { customResponse } from '@helpers/customResponse';
import { UserModel } from '@entities/user/model';

import { AuthModel } from './model';
import { ErrorMessages, SuccessMessages } from './constants';
import { loginSchema, registerSchema } from './validation';
import type { PayloadData, JwtExpiration } from './interface';

const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_EXPIRATION, JWT_REFRESH_EXPIRATION } = process.env;

export const resolvers: Resolvers = {
  Mutation: {
    register: async (_parent, args): Promise<RegisterResult> => {
      // Register validation
      const { error } = registerSchema.validate(args.input);
      if (error) return customResponse.message('AuthError', error.message);
      // Find user by email
      const fetchedUser = await AuthModel.findOne({
        email: args.input.email,
      });
      // If user exists return error else create user
      if (fetchedUser && fetchedUser.role.toLowerCase() === 'admin')
        return customResponse.message('AuthError', ErrorMessages.REGISTER_ERROR);
      if (fetchedUser) return customResponse.message('AuthError', `User ${ErrorMessages.DUPLICATE_ERROR} email.`);
      // If a role is provided create user with the specified role else create user with default 'User' role
      if (args.input.role) {
        if (args.input.role.toLowerCase() === 'admin')
          return customResponse.message('AuthError', ErrorMessages.REGISTER_ERROR);
        // Check if schema/model for that role is registered
        try {
          // Capitalize the provided string
          const RoleModel = model(args.input.role.toUpperCase().charAt(0) + args.input.role.toLowerCase().slice(1));
          // Remove role from body and create user
          delete args.input.role;
          const newUser = new RoleModel(args.input);
          await newUser.save();
          return customResponse.message('Register', SuccessMessages.REGISTER_SUCCESS);
        } catch {
          return customResponse.message('AuthError', ErrorMessages.REGISTER_ERROR);
        }
      } else {
        const newUser = new UserModel(args.input);
        await newUser.save();
        return customResponse.message('Register', SuccessMessages.REGISTER_SUCCESS);
      }
    },
    login: async (_parent, args, context): Promise<LoginResult> => {
      const { error } = loginSchema.validate(args.input);
      if (error) return customResponse.message('AuthError', error.message);
      const foundUser = await findUser(args.input.email);
      if (!foundUser) return customResponse.message('AuthError', ErrorMessages.LOGIN_ERROR);
      const passwordCompareResult = await bcryptCompare(args.input.password, foundUser.user.password);
      if (!passwordCompareResult) return customResponse.message('AuthError', ErrorMessages.LOGIN_ERROR);
      const { cookies } = context.req;
      // Refresh token array handling
      let newRefreshTokenArray = !cookies?.rtkn
        ? foundUser.role.refreshToken
        : foundUser.role.refreshToken.filter((rt: string) => rt !== cookies.rtkn);
      // Detect refresh token reuse
      if (cookies?.rtkn) {
        const refreshToken = cookies?.rtkn;
        const compromisedUser = await AuthModel.findOne({ refreshToken }, 'refreshToken');
        if (compromisedUser) {
          // Clear out all previous refresh tokens
          log.warn('Detected refresh token reuse at login.');
          newRefreshTokenArray = [];
          // Deleting the compromised refresh token
          const compromisedUserTokens = compromisedUser.refreshToken.filter((rt: string) => rt !== cookies.rtkn);
          compromisedUser.refreshToken = [...compromisedUserTokens];
          compromisedUser.save();
        }
      }
      // Generate new refresh token
      const newRefreshToken = generateToken(
        foundUser.user._id,
        foundUser.role._id,
        JWT_REFRESH_SECRET as string,
        JWT_REFRESH_EXPIRATION as JwtExpiration,
      );
      // Saving refreshToken with current user
      foundUser.role.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      await foundUser.role.save();
      // Set refresh token in http only cookie
      sendRefreshToken(context.res, newRefreshToken);
      // Send access token
      const newAccessToken = generateToken(
        foundUser.user._id,
        foundUser.role._id,
        JWT_ACCESS_SECRET as string,
        JWT_ACCESS_EXPIRATION as JwtExpiration,
      );
      return customResponse.auth('Login', newAccessToken, foundUser.user.role, SuccessMessages.LOGGED_IN);
    },
    refresh: async (_parent, _args, context): Promise<RefreshResult> => {
      const refreshToken = context?.req?.cookies?.rtkn;
      if (!refreshToken) return customResponse.message('AuthError', ErrorMessages.NOT_LOGGED_IN);
      const foundUser = await AuthModel.findOne({ refreshToken }, 'refreshToken role');
      // Detect refresh token reuse
      if (!foundUser) {
        try {
          const decoded = jwtVerify(refreshToken, JWT_REFRESH_SECRET as string) as PayloadData;
          // Clear out all previous refresh tokens
          log.warn('Detected refresh token reuse at refresh.');
          await AuthModel.updateOne({ _id: decoded.roleId }, { $set: { refreshToken: [] } });
          return customResponse.message('AuthError', ErrorMessages.FORBIDDEN);
        } catch (error) {
          return customResponse.message('AuthError', ErrorMessages.FORBIDDEN);
        }
      } else {
        // Handle refresh token array
        const newRefreshTokenArray = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);
        try {
          const decoded = jwtVerify(refreshToken, JWT_REFRESH_SECRET as string) as PayloadData;
          // Generate new refresh token
          const newRefreshToken = generateToken(
            decoded.userId,
            decoded.roleId,
            JWT_REFRESH_SECRET as string,
            JWT_REFRESH_EXPIRATION as JwtExpiration,
          );
          // Saving refreshToken
          foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
          await foundUser.save();
          // Send new refresh and access tokens
          sendRefreshToken(context.res, newRefreshToken);
          const newAccessToken = generateToken(
            decoded.userId,
            decoded.roleId,
            JWT_ACCESS_SECRET as string,
            JWT_ACCESS_EXPIRATION as JwtExpiration,
          );
          return customResponse.auth('Refresh', newAccessToken, foundUser.role, SuccessMessages.REFRESH_SUCCESS);
        } catch (error) {
          // Remove token from db if expired
          foundUser.refreshToken = [...newRefreshTokenArray];
          await foundUser.save();
          return customResponse.message('AuthError', ErrorMessages.TOKEN_EXPIRED);
        }
      }
    },
    logout: async (_parent, _args, context): Promise<LogoutResult> => {
      const refreshToken = context.req?.cookies?.rtkn;
      if (!refreshToken) return customResponse.message('AuthError', ErrorMessages.NOT_LOGGED_IN);
      // Check if user have any refresh token in database
      const foundUser = await AuthModel.findOne({ refreshToken }, 'refreshToken');
      if (!foundUser) {
        // Clear refresh token from cookie
        clearRefreshToken(context.res);
        return customResponse.message('Logout', SuccessMessages.LOGGED_OUT);
      }
      // Delete refreshToken in db
      foundUser.refreshToken = foundUser.refreshToken.filter((rt: string) => rt !== refreshToken);
      await foundUser.save();
      // Clear refresh token from cookie
      clearRefreshToken(context.res);
      return customResponse.message('Logout', SuccessMessages.LOGGED_OUT);
    },
  },
};
