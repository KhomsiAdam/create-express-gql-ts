import DataLoader from 'dataloader';
import type { Model } from 'mongoose';
import { AuthModel } from '@entities/auth/model';
import { AdminModel } from '@entities/admin/model';
import { UserModel } from '@entities/user/model';

// Create a dataloader for the given model
export const createLoader = (entityModel: Model<any>) => {
  const loader = new DataLoader(async (keys) => {
    const data = await entityModel.find({ _id: { $in: keys } });
    return keys.map((key) => data.find((item) => item._id.equals(key)));
  });
  return {
    load: async (id: unknown) => (id ? loader.load(id) : null),
    loadMany: async (ids: ArrayLike<unknown>) => loader.loadMany(ids),
    clear: (id: unknown) => loader.clear(id),
    clearAll: () => loader.clearAll(),
  };
};

// Add dataloader entry for each newly created Model
export const dataloader = {
  auth: createLoader(AuthModel),
  admin: createLoader(AdminModel),
  user: createLoader(UserModel),
};
