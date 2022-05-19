import { allow } from 'graphql-shield';

const permission = {
  Mutation: {
    register: allow,
    login: allow,
    refresh: allow,
    logout: allow,
  },
};

export default permission;
