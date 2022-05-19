import { Types, Document } from 'mongoose';
import type { VerifyErrors, JwtPayload } from 'jsonwebtoken';

import { Roles } from './constants';

export interface AuthData {
  email: string;
  role: Roles;
  refreshToken: Array<string>;
}

export interface FoundUserEntity {
  user: {
    _id: Types.ObjectId;
    password: string;
    role: Types.ObjectId | string;
  };
  role: {
    _id: Types.ObjectId;
    role: string;
    refreshToken: Array<string>;
    save: Document['save'];
  };
}

export type MaybeUserEntity = FoundUserEntity | false;

export interface PayloadData extends JwtPayload {
  userId: Types.ObjectId;
  roleId: Types.ObjectId;
}

export type JwtErrors = VerifyErrors | null;
export type JwtExpiration = string | number;
