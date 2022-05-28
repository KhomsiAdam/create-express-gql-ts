import { is } from '@middlewares/rules';
import { or } from 'graphql-shield';

const permissions = {
  Query: {
    getAllUsers: is.Auth,
    getUserById: is.Auth,
    getUserByField: is.Auth,
  },
  Mutation: {
    updateUser: or(is.Self, is.Admin),
    deleteUser: or(is.Self, is.Admin),
  },
};

export default permissions;
