import * as resolver from '@services/crud.service';
import type { Resolvers, {{capitalizedName}}Result, {{capitalizedName}}sResult, {{capitalizedName}}UpdatedResult, {{capitalizedName}}RemovedResult } from '@generated/types';
import type { AuthData } from '@entities/auth/interface';
import { {{capitalizedName}}Model } from './model';
import { ErrorMessages, SuccessMessages } from './constants';
import { {{lowercaseName}}Schema } from './validation';

export const resolvers: Resolvers = {
  Query: {
    getAll{{capitalizedName}}s: async (_parent, args): Promise<{{capitalizedName}}sResult> =>
      resolver.getAll({{capitalizedName}}Model, args, ErrorMessages.{{uppercaseName}}S_NOT_FOUND, '{{capitalizedName}}s', '{{capitalizedName}}NotFound'),
    get{{capitalizedName}}ById: async (_parent, args): Promise<{{capitalizedName}}Result> =>
      resolver.getById({{capitalizedName}}Model, args.id, ErrorMessages.{{uppercaseName}}_NOT_FOUND, '{{capitalizedName}}By', '{{capitalizedName}}NotFound'),
    get{{capitalizedName}}ByField: async (_parent, args): Promise<{{capitalizedName}}Result> =>
      resolver.getByField({{capitalizedName}}Model, args.field, args.value, ErrorMessages.{{uppercaseName}}_NOT_FOUND, '{{capitalizedName}}By', '{{capitalizedName}}NotFound'),
  },

  Mutation: {
    update{{capitalizedName}}: async (_parent, args): Promise<{{capitalizedName}}UpdatedResult> =>
      resolver.update(
        {{capitalizedName}}Model,
        args.id,
        args.input,
        {{lowercaseName}}Schema,
        SuccessMessages.{{uppercaseName}}_UPDATED,
        ErrorMessages.{{uppercaseName}}_NOT_FOUND,
        '{{capitalizedName}}Updated',
        '{{capitalizedName}}NotFound',
      ),
    remove{{capitalizedName}}: async (_parent, args): Promise<{{capitalizedName}}RemovedResult> =>
      resolver.remove(
        {{capitalizedName}}Model,
        args.id,
        SuccessMessages.{{uppercaseName}}_DELETED,
        ErrorMessages.{{uppercaseName}}_NOT_FOUND,
        '{{capitalizedName}}Removed',
        '{{capitalizedName}}NotFound',
      ),
  },

  {{capitalizedName}}: {
    role: async ({ role }, _args, { dataloader }): Promise<AuthData> => dataloader.auth.load(role),
  },
};
