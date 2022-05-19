import { is } from '@middlewares/rules';
import { or } from 'graphql-shield';

const permission = {
  Query: {
    getAll{{capitalizedName}}s: is.Auth,
    get{{capitalizedName}}ById: is.Auth,
    get{{capitalizedName}}ByField: is.Auth,
  },
  Mutation: {
    update{{capitalizedName}}: or(is.Self, is.Admin),
    remove{{capitalizedName}}: or(is.Self, is.Admin),
  },
};

export default permission;
