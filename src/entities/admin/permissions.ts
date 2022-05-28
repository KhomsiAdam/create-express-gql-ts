import { is } from '@middlewares/rules';

const permissions = {
  Query: {
    getAllAdmins: is.Admin,
    getAdminById: is.Admin,
    getAdminByField: is.Admin,
  },
  Mutation: {
    updateAdmin: is.Self,
    deleteAdmin: is.Self,
  },
};

export default permissions;
