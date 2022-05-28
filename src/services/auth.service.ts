import type { Request, Response } from 'express';
import { Types, model, modelNames } from 'mongoose';
import { AuthenticationError, ForbiddenError } from 'apollo-server-core';
import { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken';

import { AuthModel } from '@entities/auth/model';
import type { FoundUserEntity, JwtExpiration, MaybeUserEntity, PayloadData } from '@entities/auth/interface';
import { cookieName, ErrorMessages, Permissions } from '@entities/auth/constants';
import { CustomError, StatusCode, getEntityFromOperation } from '@helpers';

const { JWT_ACCESS_SECRET, REFRESH_TOKEN_ENDPOINT } = process.env;

// Access Token generation when login
export const generateToken = (
  payloadUserId: Types.ObjectId,
  payloadRoleId: Types.ObjectId,
  secret: string,
  expiration: JwtExpiration,
): string => {
  const payload: PayloadData = {
    userId: payloadUserId,
    roleId: payloadRoleId,
  };
  return jwtSign(payload, secret, {
    expiresIn: expiration,
  });
};

// Send refresh token and set to cookie
export const sendRefreshToken = (res: Response, token: string): void => {
  res.cookie(cookieName, token, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: REFRESH_TOKEN_ENDPOINT,
    maxAge: 24 * 60 * 60 * 1000,
  });
};

// Clear refresh token from cookie
export const clearRefreshToken = (res: Response): void => {
  res.clearCookie(cookieName, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: REFRESH_TOKEN_ENDPOINT,
  });
};

// Verify token and user role if provided
export const verifyAuth = async (req: Request, role?: string, permission?: string, argsId?: Types.ObjectId) => {
  // Get authorization header
  const authHeader = req.get('Authorization');
  // Check for 'Bearer' scheme
  if (!authHeader?.startsWith('Bearer ')) return new AuthenticationError(ErrorMessages.NOT_AUTHENTICATED);
  // Check for token
  const token = authHeader?.split(' ')[1];
  if (!token) return new AuthenticationError(ErrorMessages.NOT_AUTHENTICATED);
  try {
    const decoded = jwtVerify(token, JWT_ACCESS_SECRET as string) as PayloadData;
    // Check permission for operations on self
    if (permission && permission === Permissions.SELF && argsId && argsId !== decoded.userId)
      return new ForbiddenError(ErrorMessages.NOT_AUTHORIZED);
    // Check permission for operations on owned entities
    if (permission && permission === Permissions.OWN && argsId) {
      const { query, operationName } = req.body;
      const queryName = operationName || query.split(' ')[1];
      const entityName = getEntityFromOperation(modelNames(), queryName);
      if (!entityName) return new CustomError(ErrorMessages.INVALID_OPERATION_NAME, StatusCode.InvalidOperationName);
      const findOwnedEntity =
        entityName && (await model(entityName).findOne({ _id: argsId, user: decoded.userId }).lean());
      if (!findOwnedEntity) return new ForbiddenError(ErrorMessages.NOT_AUTHORIZED);
    }
    // Token verified and no role provided, user is authenticated
    if (!role) return decoded !== null;
    // When role is provided check if user exists with id from token
    const authorizedUser = await model(role).findOne({ _id: decoded.userId });
    if (!authorizedUser) return new ForbiddenError(ErrorMessages.NOT_AUTHORIZED);
    return authorizedUser !== null;
  } catch (error) {
    return new CustomError(error, StatusCode[error.constructor.name as keyof typeof StatusCode]);
  }
};

// Finding the existence of a user
export const findUser = async (inputEmail: string): Promise<MaybeUserEntity> => {
  // Get the user's role and refresh tokens by email from the auth/role collection
  const fetchedRole = (await AuthModel.findOne({ email: inputEmail }, 'role refreshToken')) as FoundUserEntity['role'];
  if (!fetchedRole) return false;
  // Get the user's password by email from the specified collection from the role
  const fetchedUser = (await model(fetchedRole.role).findOne(
    { email: inputEmail },
    'password',
  )) as FoundUserEntity['user'];
  if (!fetchedUser) return false;
  // Return the user password, role and refresh tokens
  return {
    user: {
      _id: fetchedUser._id,
      password: fetchedUser.password,
      role: fetchedRole.role,
    },
    role: fetchedRole,
  };
};
