import { ObjectSchema } from 'joi';
import { Model, Types, isValidObjectId } from 'mongoose';
import { customResponse } from '@helpers';

interface QueryOptions {
  filter?: any;
  sort?: {
    field?: any;
    order?: any;
  } | null;
  paginate?: {
    limit?: any;
    page?: any;
  } | null;
}

export const getAll = async (
  EntityModel: Model<any>,
  options: QueryOptions,
  ErrorMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const queryString =
    options.filter &&
    (JSON.stringify(options.filter).replace(/\b(eq|ne|gte|gt|lte|lt)\b/g, (match) => `$${match}`) as string);
  type PaginationLimit = number | bigint | any;
  const page = (options.paginate && (options.paginate.page as PaginationLimit)) * 1 || 1;
  const limit = (options.paginate && (options.paginate.limit as PaginationLimit)) * 1 || 100;
  const skip = (page - 1) * limit;
  // Setup the query
  const foundEntities = await EntityModel.find(queryString && JSON.parse(queryString))
    .sort(options.sort && { [options.sort.field as string]: options.sort.order })
    .skip(skip)
    .limit(limit)
    .lean();
  if (foundEntities && Array.isArray(foundEntities) && foundEntities.length > 0)
    return customResponse.entities(typeNameSuccess, foundEntities);
  return customResponse.message(typeNameError, ErrorMessage);
};

export const getById = async (
  EntityModel: Model<any>,
  id: Types.ObjectId,
  ErrorMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const foundEntity = await EntityModel.findById(id).lean();
  if (foundEntity) return customResponse.entity(typeNameSuccess, foundEntity);
  return customResponse.message(typeNameError, ErrorMessage);
};

export const getByField = async (
  EntityModel: Model<any>,
  field: string,
  value: string,
  ErrorMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const foundEntity = await EntityModel.findOne({ [field]: value }).lean();
  if (foundEntity) return customResponse.entity(typeNameSuccess, foundEntity);
  return customResponse.message(typeNameError, ErrorMessage);
};

export const create = async (
  EntityModel: Model<any>,
  input: object,
  entitySchema: ObjectSchema,
  SuccessMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const { error } = entitySchema.validate(input);
  if (error) return customResponse.message(typeNameError, error.message);
  const createdEntity = new EntityModel(input);
  await createdEntity.save();
  return customResponse.operation(typeNameSuccess, createdEntity, SuccessMessage);
};

export const update = async (
  EntityModel: Model<any>,
  id: Types.ObjectId,
  input: object,
  entitySchema: ObjectSchema,
  SuccessMessage: string,
  ErrorMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const { error } = entitySchema.validate(input);
  if (error) return customResponse.message(typeNameError, error.message);
  if (!isValidObjectId(id)) return customResponse.message(typeNameError, 'Invalid id');
  const updatedEntity = await EntityModel.findOneAndUpdate({ _id: id }, { $set: input }, { new: true }).lean();
  if (updatedEntity) return customResponse.operation(typeNameSuccess, updatedEntity, SuccessMessage);
  return customResponse.message(typeNameError, ErrorMessage);
};

export const remove = async (
  EntityModel: Model<any>,
  id: Types.ObjectId,
  SuccessMessage: string,
  ErrorMessage: string,
  typeNameSuccess: string,
  typeNameError: string,
) => {
  const deletedEntity = await EntityModel.findOneAndDelete({ _id: id }).lean();
  if (deletedEntity) return customResponse.operation(typeNameSuccess, deletedEntity, SuccessMessage);
  return customResponse.message(typeNameError, ErrorMessage);
};
