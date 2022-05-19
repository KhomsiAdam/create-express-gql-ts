import { is } from '@middlewares/rules';
import { or } from 'graphql-shield';

const permission = {
  Query: {
    getAll{{capitalizedName}}s: is.Auth,
    get{{capitalizedName}}ById: is.Auth,
    get{{capitalizedName}}ByField: is.Auth,
  },
  Mutation: {
    create{{capitalizedName}}: is.Auth,
    update{{capitalizedName}}: or(is.Own, is.Admin),
    remove{{capitalizedName}}: or(is.Own, is.Admin),
  },
};

export default permission;
