import { rule } from 'graphql-shield';
import { IRuleConstructorOptions } from 'graphql-shield/dist/types';
import { verifyAuth } from '@services/auth.service';
import { Roles, Permissions } from '@entities/auth/constants';

const options: IRuleConstructorOptions = { cache: 'contextual' };

export const is = {
  Auth: rule(options)(async (_parent, _args, context) => verifyAuth(context.req)),
  Self: rule(options)(async (_parent, args, context) => verifyAuth(context.req, '', Permissions.SELF, args.id)),
  Own: rule(options)(async (_parent, args, context) => verifyAuth(context.req, '', Permissions.OWN, args.id)),
  Admin: rule(options)(async (_parent, _args, context) => verifyAuth(context.req, Roles.ADMIN)),
  User: rule(options)(async (_parent, _args, context) => verifyAuth(context.req, Roles.USER)),
};
