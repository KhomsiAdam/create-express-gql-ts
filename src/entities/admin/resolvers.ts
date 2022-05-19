import * as resolver from '@services/crud.service';
import type { Resolvers, AdminResult, AdminsResult, AdminUpdatedResult, AdminDeletedResult } from '@generated/types';
import { AuthData } from '@entities/auth/interface';
import { AdminModel } from './model';
import { ErrorMessages, SuccessMessages } from './constants';
import { adminSchema } from './validation';

export const resolvers: Resolvers = {
  Query: {
    getAllAdmins: async (_parent, args): Promise<AdminsResult> =>
      resolver.getAll(AdminModel, args, ErrorMessages.ADMINS_NOT_FOUND, 'Admins', 'AdminNotFound'),
    getAdminById: async (_parent, args): Promise<AdminResult> =>
      resolver.getById(AdminModel, args.id, ErrorMessages.ADMIN_NOT_FOUND, 'AdminBy', 'AdminNotFound'),
    getAdminByField: async (_parent, args): Promise<AdminResult> =>
      resolver.getByField(
        AdminModel,
        args.field,
        args.value,
        ErrorMessages.ADMIN_NOT_FOUND,
        'AdminBy',
        'AdminNotFound',
      ),
  },

  Mutation: {
    updateAdmin: async (_parent, args): Promise<AdminUpdatedResult> =>
      resolver.update(
        AdminModel,
        args.id,
        args.input,
        adminSchema,
        SuccessMessages.ADMIN_UPDATED,
        ErrorMessages.ADMIN_NOT_FOUND,
        'AdminUpdated',
        'AdminNotFound',
      ),
    deleteAdmin: async (_parent, args): Promise<AdminDeletedResult> =>
      resolver.remove(
        AdminModel,
        args.id,
        SuccessMessages.ADMIN_DELETED,
        ErrorMessages.ADMIN_NOT_FOUND,
        'AdminDeleted',
        'AdminNotFound',
      ),
  },

  Admin: {
    role: async ({ role }, _args, { dataloader }): Promise<AuthData> => dataloader.auth.load(role),
  },
};
