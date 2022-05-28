import { allow } from 'graphql-shield';

const permissions = {
  Mutation: {
    register: allow,
    login: allow,
    refresh: allow,
    logout: allow,
  },
};

export default permissions;
