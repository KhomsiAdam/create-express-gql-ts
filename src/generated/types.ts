import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../config/context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectId: any;
};

export type Admin = {
  __typename?: 'Admin';
  _id?: Maybe<Scalars['ObjectId']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  role?: Maybe<Auth>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AdminBy = {
  __typename?: 'AdminBy';
  entity: Admin;
};

export type AdminDeleted = {
  __typename?: 'AdminDeleted';
  entity: Admin;
  message: Scalars['String'];
};

export type AdminDeletedResult = AdminDeleted | AdminNotFound;

export type AdminNotFound = {
  __typename?: 'AdminNotFound';
  message: Scalars['String'];
};

export type AdminResult = AdminBy | AdminNotFound;

export type AdminUpdated = {
  __typename?: 'AdminUpdated';
  entity: Admin;
  message: Scalars['String'];
};

export type AdminUpdatedInput = {
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type AdminUpdatedResult = AdminNotFound | AdminUpdated;

export type Admins = {
  __typename?: 'Admins';
  entities: Array<Admin>;
};

export type AdminsResult = AdminNotFound | Admins;

export type Auth = {
  __typename?: 'Auth';
  _id?: Maybe<Scalars['ObjectId']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AuthError = {
  __typename?: 'AuthError';
  message: Scalars['String'];
};

export type FilterCondition = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  ne?: InputMaybe<Scalars['String']>;
};

export type FilterInput = {
  content?: InputMaybe<FilterCondition>;
  title?: InputMaybe<FilterCondition>;
};

export type Login = {
  __typename?: 'Login';
  message: Scalars['String'];
  role: Scalars['String'];
  token: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResult = AuthError | Login;

export type Logout = {
  __typename?: 'Logout';
  message: Scalars['String'];
};

export type LogoutResult = AuthError | Logout;

export type Manager = {
  __typename?: 'Manager';
  _id?: Maybe<Scalars['ObjectId']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  role?: Maybe<Auth>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ManagerBy = {
  __typename?: 'ManagerBy';
  entity: Manager;
};

export type ManagerNotFound = {
  __typename?: 'ManagerNotFound';
  message: Scalars['String'];
};

export type ManagerRemoved = {
  __typename?: 'ManagerRemoved';
  entity: Manager;
  message: Scalars['String'];
};

export type ManagerRemovedResult = ManagerNotFound | ManagerRemoved;

export type ManagerResult = ManagerBy | ManagerNotFound;

export type ManagerUpdated = {
  __typename?: 'ManagerUpdated';
  entity: Manager;
  message: Scalars['String'];
};

export type ManagerUpdatedInput = {
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type ManagerUpdatedResult = ManagerNotFound | ManagerUpdated;

export type Managers = {
  __typename?: 'Managers';
  entities: Array<Manager>;
};

export type ManagersResult = ManagerNotFound | Managers;

export type Mutation = {
  __typename?: 'Mutation';
  createPost: PostCreatedResult;
  deleteAdmin: AdminDeletedResult;
  deleteUser: UserDeletedResult;
  login: LoginResult;
  logout: LogoutResult;
  refresh: RefreshResult;
  register: RegisterResult;
  removeManager: ManagerRemovedResult;
  removePost: PostRemovedResult;
  updateAdmin: AdminUpdatedResult;
  updateManager: ManagerUpdatedResult;
  updatePost: PostUpdatedResult;
  updateUser: UserUpdatedResult;
};


export type MutationCreatePostArgs = {
  input: PostCreatedInput;
};


export type MutationDeleteAdminArgs = {
  id: Scalars['ObjectId'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ObjectId'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationRemoveManagerArgs = {
  id: Scalars['ObjectId'];
};


export type MutationRemovePostArgs = {
  id: Scalars['ObjectId'];
};


export type MutationUpdateAdminArgs = {
  id: Scalars['ObjectId'];
  input: AdminUpdatedInput;
};


export type MutationUpdateManagerArgs = {
  id: Scalars['ObjectId'];
  input: ManagerUpdatedInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['ObjectId'];
  input: PostUpdatedInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ObjectId'];
  input: UserUpdatedInput;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
};

export type Post = {
  __typename?: 'Post';
  _id?: Maybe<Scalars['ObjectId']>;
  content?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user?: Maybe<User>;
};

export type PostBy = {
  __typename?: 'PostBy';
  entity: Post;
};

export type PostCreated = {
  __typename?: 'PostCreated';
  entity: Post;
  message: Scalars['String'];
};

export type PostCreatedInput = {
  content: Scalars['String'];
  title: Scalars['String'];
  user: Scalars['ObjectId'];
};

export type PostCreatedResult = PostCreated | PostNotFound;

export type PostNotFound = {
  __typename?: 'PostNotFound';
  message: Scalars['String'];
};

export type PostRemoved = {
  __typename?: 'PostRemoved';
  entity: Post;
  message: Scalars['String'];
};

export type PostRemovedResult = PostNotFound | PostRemoved;

export type PostResult = PostBy | PostNotFound;

export type PostUpdated = {
  __typename?: 'PostUpdated';
  entity: Post;
  message: Scalars['String'];
};

export type PostUpdatedInput = {
  content?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['ObjectId']>;
};

export type PostUpdatedResult = PostNotFound | PostUpdated;

export type Posts = {
  __typename?: 'Posts';
  entities: Array<Post>;
};

export type PostsResult = PostNotFound | Posts;

export type Query = {
  __typename?: 'Query';
  getAdminByField: AdminResult;
  getAdminById: AdminResult;
  getAllAdmins: AdminsResult;
  getAllManagers: ManagersResult;
  getAllPosts: PostsResult;
  getAllUsers: UsersResult;
  getManagerByField: ManagerResult;
  getManagerById: ManagerResult;
  getPostByField: PostResult;
  getPostById: PostResult;
  getUserByField: UserResult;
  getUserById: UserResult;
};


export type QueryGetAdminByFieldArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryGetAdminByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetAllAdminsArgs = {
  filter?: InputMaybe<FilterInput>;
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllManagersArgs = {
  filter?: InputMaybe<FilterInput>;
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllPostsArgs = {
  filter?: InputMaybe<FilterInput>;
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetAllUsersArgs = {
  filter?: InputMaybe<FilterInput>;
  paginate?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryGetManagerByFieldArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryGetManagerByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetPostByFieldArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryGetPostByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetUserByFieldArgs = {
  field: Scalars['String'];
  value: Scalars['String'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectId'];
};

export type Refresh = {
  __typename?: 'Refresh';
  message: Scalars['String'];
  role: Scalars['String'];
  token: Scalars['String'];
};

export type RefreshResult = AuthError | Refresh;

export type Register = {
  __typename?: 'Register';
  message: Scalars['String'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Scalars['String']>;
};

export type RegisterResult = AuthError | Register;

export type SortInput = {
  field?: InputMaybe<SortableField>;
  order?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum SortableField {
  CreatedAt = 'createdAt'
}

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ObjectId']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  role?: Maybe<Auth>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserBy = {
  __typename?: 'UserBy';
  entity: User;
};

export type UserDeleted = {
  __typename?: 'UserDeleted';
  entity: User;
  message: Scalars['String'];
};

export type UserDeletedResult = UserDeleted | UserNotFound;

export type UserNotFound = {
  __typename?: 'UserNotFound';
  message: Scalars['String'];
};

export type UserResult = UserBy | UserNotFound;

export type UserUpdated = {
  __typename?: 'UserUpdated';
  entity: User;
  message: Scalars['String'];
};

export type UserUpdatedInput = {
  firstname?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
};

export type UserUpdatedResult = UserNotFound | UserUpdated;

export type Users = {
  __typename?: 'Users';
  entities: Array<User>;
};

export type UsersResult = UserNotFound | Users;



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Admin: ResolverTypeWrapper<Admin>;
  AdminBy: ResolverTypeWrapper<AdminBy>;
  AdminDeleted: ResolverTypeWrapper<AdminDeleted>;
  AdminDeletedResult: ResolversTypes['AdminDeleted'] | ResolversTypes['AdminNotFound'];
  AdminNotFound: ResolverTypeWrapper<AdminNotFound>;
  AdminResult: ResolversTypes['AdminBy'] | ResolversTypes['AdminNotFound'];
  AdminUpdated: ResolverTypeWrapper<AdminUpdated>;
  AdminUpdatedInput: AdminUpdatedInput;
  AdminUpdatedResult: ResolversTypes['AdminNotFound'] | ResolversTypes['AdminUpdated'];
  Admins: ResolverTypeWrapper<Admins>;
  AdminsResult: ResolversTypes['AdminNotFound'] | ResolversTypes['Admins'];
  Auth: ResolverTypeWrapper<Auth>;
  AuthError: ResolverTypeWrapper<AuthError>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  FilterCondition: FilterCondition;
  FilterInput: FilterInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Login: ResolverTypeWrapper<Login>;
  LoginInput: LoginInput;
  LoginResult: ResolversTypes['AuthError'] | ResolversTypes['Login'];
  Logout: ResolverTypeWrapper<Logout>;
  LogoutResult: ResolversTypes['AuthError'] | ResolversTypes['Logout'];
  Manager: ResolverTypeWrapper<Manager>;
  ManagerBy: ResolverTypeWrapper<ManagerBy>;
  ManagerNotFound: ResolverTypeWrapper<ManagerNotFound>;
  ManagerRemoved: ResolverTypeWrapper<ManagerRemoved>;
  ManagerRemovedResult: ResolversTypes['ManagerNotFound'] | ResolversTypes['ManagerRemoved'];
  ManagerResult: ResolversTypes['ManagerBy'] | ResolversTypes['ManagerNotFound'];
  ManagerUpdated: ResolverTypeWrapper<ManagerUpdated>;
  ManagerUpdatedInput: ManagerUpdatedInput;
  ManagerUpdatedResult: ResolversTypes['ManagerNotFound'] | ResolversTypes['ManagerUpdated'];
  Managers: ResolverTypeWrapper<Managers>;
  ManagersResult: ResolversTypes['ManagerNotFound'] | ResolversTypes['Managers'];
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']>;
  PaginationInput: PaginationInput;
  Post: ResolverTypeWrapper<Post>;
  PostBy: ResolverTypeWrapper<PostBy>;
  PostCreated: ResolverTypeWrapper<PostCreated>;
  PostCreatedInput: PostCreatedInput;
  PostCreatedResult: ResolversTypes['PostCreated'] | ResolversTypes['PostNotFound'];
  PostNotFound: ResolverTypeWrapper<PostNotFound>;
  PostRemoved: ResolverTypeWrapper<PostRemoved>;
  PostRemovedResult: ResolversTypes['PostNotFound'] | ResolversTypes['PostRemoved'];
  PostResult: ResolversTypes['PostBy'] | ResolversTypes['PostNotFound'];
  PostUpdated: ResolverTypeWrapper<PostUpdated>;
  PostUpdatedInput: PostUpdatedInput;
  PostUpdatedResult: ResolversTypes['PostNotFound'] | ResolversTypes['PostUpdated'];
  Posts: ResolverTypeWrapper<Posts>;
  PostsResult: ResolversTypes['PostNotFound'] | ResolversTypes['Posts'];
  Query: ResolverTypeWrapper<{}>;
  Refresh: ResolverTypeWrapper<Refresh>;
  RefreshResult: ResolversTypes['AuthError'] | ResolversTypes['Refresh'];
  Register: ResolverTypeWrapper<Register>;
  RegisterInput: RegisterInput;
  RegisterResult: ResolversTypes['AuthError'] | ResolversTypes['Register'];
  SortInput: SortInput;
  SortOrder: SortOrder;
  SortableField: SortableField;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
  UserBy: ResolverTypeWrapper<UserBy>;
  UserDeleted: ResolverTypeWrapper<UserDeleted>;
  UserDeletedResult: ResolversTypes['UserDeleted'] | ResolversTypes['UserNotFound'];
  UserNotFound: ResolverTypeWrapper<UserNotFound>;
  UserResult: ResolversTypes['UserBy'] | ResolversTypes['UserNotFound'];
  UserUpdated: ResolverTypeWrapper<UserUpdated>;
  UserUpdatedInput: UserUpdatedInput;
  UserUpdatedResult: ResolversTypes['UserNotFound'] | ResolversTypes['UserUpdated'];
  Users: ResolverTypeWrapper<Users>;
  UsersResult: ResolversTypes['UserNotFound'] | ResolversTypes['Users'];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Admin: Admin;
  AdminBy: AdminBy;
  AdminDeleted: AdminDeleted;
  AdminDeletedResult: ResolversParentTypes['AdminDeleted'] | ResolversParentTypes['AdminNotFound'];
  AdminNotFound: AdminNotFound;
  AdminResult: ResolversParentTypes['AdminBy'] | ResolversParentTypes['AdminNotFound'];
  AdminUpdated: AdminUpdated;
  AdminUpdatedInput: AdminUpdatedInput;
  AdminUpdatedResult: ResolversParentTypes['AdminNotFound'] | ResolversParentTypes['AdminUpdated'];
  Admins: Admins;
  AdminsResult: ResolversParentTypes['AdminNotFound'] | ResolversParentTypes['Admins'];
  Auth: Auth;
  AuthError: AuthError;
  Boolean: Scalars['Boolean'];
  DateTime: Scalars['DateTime'];
  FilterCondition: FilterCondition;
  FilterInput: FilterInput;
  Int: Scalars['Int'];
  Login: Login;
  LoginInput: LoginInput;
  LoginResult: ResolversParentTypes['AuthError'] | ResolversParentTypes['Login'];
  Logout: Logout;
  LogoutResult: ResolversParentTypes['AuthError'] | ResolversParentTypes['Logout'];
  Manager: Manager;
  ManagerBy: ManagerBy;
  ManagerNotFound: ManagerNotFound;
  ManagerRemoved: ManagerRemoved;
  ManagerRemovedResult: ResolversParentTypes['ManagerNotFound'] | ResolversParentTypes['ManagerRemoved'];
  ManagerResult: ResolversParentTypes['ManagerBy'] | ResolversParentTypes['ManagerNotFound'];
  ManagerUpdated: ManagerUpdated;
  ManagerUpdatedInput: ManagerUpdatedInput;
  ManagerUpdatedResult: ResolversParentTypes['ManagerNotFound'] | ResolversParentTypes['ManagerUpdated'];
  Managers: Managers;
  ManagersResult: ResolversParentTypes['ManagerNotFound'] | ResolversParentTypes['Managers'];
  Mutation: {};
  ObjectId: Scalars['ObjectId'];
  PaginationInput: PaginationInput;
  Post: Post;
  PostBy: PostBy;
  PostCreated: PostCreated;
  PostCreatedInput: PostCreatedInput;
  PostCreatedResult: ResolversParentTypes['PostCreated'] | ResolversParentTypes['PostNotFound'];
  PostNotFound: PostNotFound;
  PostRemoved: PostRemoved;
  PostRemovedResult: ResolversParentTypes['PostNotFound'] | ResolversParentTypes['PostRemoved'];
  PostResult: ResolversParentTypes['PostBy'] | ResolversParentTypes['PostNotFound'];
  PostUpdated: PostUpdated;
  PostUpdatedInput: PostUpdatedInput;
  PostUpdatedResult: ResolversParentTypes['PostNotFound'] | ResolversParentTypes['PostUpdated'];
  Posts: Posts;
  PostsResult: ResolversParentTypes['PostNotFound'] | ResolversParentTypes['Posts'];
  Query: {};
  Refresh: Refresh;
  RefreshResult: ResolversParentTypes['AuthError'] | ResolversParentTypes['Refresh'];
  Register: Register;
  RegisterInput: RegisterInput;
  RegisterResult: ResolversParentTypes['AuthError'] | ResolversParentTypes['Register'];
  SortInput: SortInput;
  String: Scalars['String'];
  User: User;
  UserBy: UserBy;
  UserDeleted: UserDeleted;
  UserDeletedResult: ResolversParentTypes['UserDeleted'] | ResolversParentTypes['UserNotFound'];
  UserNotFound: UserNotFound;
  UserResult: ResolversParentTypes['UserBy'] | ResolversParentTypes['UserNotFound'];
  UserUpdated: UserUpdated;
  UserUpdatedInput: UserUpdatedInput;
  UserUpdatedResult: ResolversParentTypes['UserNotFound'] | ResolversParentTypes['UserUpdated'];
  Users: Users;
  UsersResult: ResolversParentTypes['UserNotFound'] | ResolversParentTypes['Users'];
};

export type AdminResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminByResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminBy'] = ResolversParentTypes['AdminBy']> = {
  entity?: Resolver<ResolversTypes['Admin'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminDeletedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminDeleted'] = ResolversParentTypes['AdminDeleted']> = {
  entity?: Resolver<ResolversTypes['Admin'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminDeletedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminDeletedResult'] = ResolversParentTypes['AdminDeletedResult']> = {
  __resolveType: TypeResolveFn<'AdminDeleted' | 'AdminNotFound', ParentType, ContextType>;
};

export type AdminNotFoundResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminNotFound'] = ResolversParentTypes['AdminNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminResult'] = ResolversParentTypes['AdminResult']> = {
  __resolveType: TypeResolveFn<'AdminBy' | 'AdminNotFound', ParentType, ContextType>;
};

export type AdminUpdatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminUpdated'] = ResolversParentTypes['AdminUpdated']> = {
  entity?: Resolver<ResolversTypes['Admin'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminUpdatedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminUpdatedResult'] = ResolversParentTypes['AdminUpdatedResult']> = {
  __resolveType: TypeResolveFn<'AdminNotFound' | 'AdminUpdated', ParentType, ContextType>;
};

export type AdminsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Admins'] = ResolversParentTypes['Admins']> = {
  entities?: Resolver<Array<ResolversTypes['Admin']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AdminsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AdminsResult'] = ResolversParentTypes['AdminsResult']> = {
  __resolveType: TypeResolveFn<'AdminNotFound' | 'Admins', ParentType, ContextType>;
};

export type AuthResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Auth'] = ResolversParentTypes['Auth']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthErrorResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthError'] = ResolversParentTypes['AuthError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type LoginResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Login'] = ResolversParentTypes['Login']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LoginResult'] = ResolversParentTypes['LoginResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'Login', ParentType, ContextType>;
};

export type LogoutResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Logout'] = ResolversParentTypes['Logout']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['LogoutResult'] = ResolversParentTypes['LogoutResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'Logout', ParentType, ContextType>;
};

export type ManagerResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Manager'] = ResolversParentTypes['Manager']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerByResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerBy'] = ResolversParentTypes['ManagerBy']> = {
  entity?: Resolver<ResolversTypes['Manager'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerNotFoundResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerNotFound'] = ResolversParentTypes['ManagerNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerRemovedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerRemoved'] = ResolversParentTypes['ManagerRemoved']> = {
  entity?: Resolver<ResolversTypes['Manager'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerRemovedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerRemovedResult'] = ResolversParentTypes['ManagerRemovedResult']> = {
  __resolveType: TypeResolveFn<'ManagerNotFound' | 'ManagerRemoved', ParentType, ContextType>;
};

export type ManagerResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerResult'] = ResolversParentTypes['ManagerResult']> = {
  __resolveType: TypeResolveFn<'ManagerBy' | 'ManagerNotFound', ParentType, ContextType>;
};

export type ManagerUpdatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerUpdated'] = ResolversParentTypes['ManagerUpdated']> = {
  entity?: Resolver<ResolversTypes['Manager'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagerUpdatedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagerUpdatedResult'] = ResolversParentTypes['ManagerUpdatedResult']> = {
  __resolveType: TypeResolveFn<'ManagerNotFound' | 'ManagerUpdated', ParentType, ContextType>;
};

export type ManagersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Managers'] = ResolversParentTypes['Managers']> = {
  entities?: Resolver<Array<ResolversTypes['Manager']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ManagersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ManagersResult'] = ResolversParentTypes['ManagersResult']> = {
  __resolveType: TypeResolveFn<'ManagerNotFound' | 'Managers', ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['PostCreatedResult'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'input'>>;
  deleteAdmin?: Resolver<ResolversTypes['AdminDeletedResult'], ParentType, ContextType, RequireFields<MutationDeleteAdminArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['UserDeletedResult'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<ResolversTypes['LoginResult'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  logout?: Resolver<ResolversTypes['LogoutResult'], ParentType, ContextType>;
  refresh?: Resolver<ResolversTypes['RefreshResult'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['RegisterResult'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'input'>>;
  removeManager?: Resolver<ResolversTypes['ManagerRemovedResult'], ParentType, ContextType, RequireFields<MutationRemoveManagerArgs, 'id'>>;
  removePost?: Resolver<ResolversTypes['PostRemovedResult'], ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'id'>>;
  updateAdmin?: Resolver<ResolversTypes['AdminUpdatedResult'], ParentType, ContextType, RequireFields<MutationUpdateAdminArgs, 'id' | 'input'>>;
  updateManager?: Resolver<ResolversTypes['ManagerUpdatedResult'], ParentType, ContextType, RequireFields<MutationUpdateManagerArgs, 'id' | 'input'>>;
  updatePost?: Resolver<ResolversTypes['PostUpdatedResult'], ParentType, ContextType, RequireFields<MutationUpdatePostArgs, 'id' | 'input'>>;
  updateUser?: Resolver<ResolversTypes['UserUpdatedResult'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id' | 'input'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type PostResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostByResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostBy'] = ResolversParentTypes['PostBy']> = {
  entity?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCreatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostCreated'] = ResolversParentTypes['PostCreated']> = {
  entity?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostCreatedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostCreatedResult'] = ResolversParentTypes['PostCreatedResult']> = {
  __resolveType: TypeResolveFn<'PostCreated' | 'PostNotFound', ParentType, ContextType>;
};

export type PostNotFoundResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostNotFound'] = ResolversParentTypes['PostNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostRemovedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostRemoved'] = ResolversParentTypes['PostRemoved']> = {
  entity?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostRemovedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostRemovedResult'] = ResolversParentTypes['PostRemovedResult']> = {
  __resolveType: TypeResolveFn<'PostNotFound' | 'PostRemoved', ParentType, ContextType>;
};

export type PostResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostResult'] = ResolversParentTypes['PostResult']> = {
  __resolveType: TypeResolveFn<'PostBy' | 'PostNotFound', ParentType, ContextType>;
};

export type PostUpdatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostUpdated'] = ResolversParentTypes['PostUpdated']> = {
  entity?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostUpdatedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostUpdatedResult'] = ResolversParentTypes['PostUpdatedResult']> = {
  __resolveType: TypeResolveFn<'PostNotFound' | 'PostUpdated', ParentType, ContextType>;
};

export type PostsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Posts'] = ResolversParentTypes['Posts']> = {
  entities?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostsResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PostsResult'] = ResolversParentTypes['PostsResult']> = {
  __resolveType: TypeResolveFn<'PostNotFound' | 'Posts', ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAdminByField?: Resolver<ResolversTypes['AdminResult'], ParentType, ContextType, RequireFields<QueryGetAdminByFieldArgs, 'field' | 'value'>>;
  getAdminById?: Resolver<ResolversTypes['AdminResult'], ParentType, ContextType, RequireFields<QueryGetAdminByIdArgs, 'id'>>;
  getAllAdmins?: Resolver<ResolversTypes['AdminsResult'], ParentType, ContextType, Partial<QueryGetAllAdminsArgs>>;
  getAllManagers?: Resolver<ResolversTypes['ManagersResult'], ParentType, ContextType, Partial<QueryGetAllManagersArgs>>;
  getAllPosts?: Resolver<ResolversTypes['PostsResult'], ParentType, ContextType, Partial<QueryGetAllPostsArgs>>;
  getAllUsers?: Resolver<ResolversTypes['UsersResult'], ParentType, ContextType, Partial<QueryGetAllUsersArgs>>;
  getManagerByField?: Resolver<ResolversTypes['ManagerResult'], ParentType, ContextType, RequireFields<QueryGetManagerByFieldArgs, 'field' | 'value'>>;
  getManagerById?: Resolver<ResolversTypes['ManagerResult'], ParentType, ContextType, RequireFields<QueryGetManagerByIdArgs, 'id'>>;
  getPostByField?: Resolver<ResolversTypes['PostResult'], ParentType, ContextType, RequireFields<QueryGetPostByFieldArgs, 'field' | 'value'>>;
  getPostById?: Resolver<ResolversTypes['PostResult'], ParentType, ContextType, RequireFields<QueryGetPostByIdArgs, 'id'>>;
  getUserByField?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<QueryGetUserByFieldArgs, 'field' | 'value'>>;
  getUserById?: Resolver<ResolversTypes['UserResult'], ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
};

export type RefreshResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Refresh'] = ResolversParentTypes['Refresh']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RefreshResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RefreshResult'] = ResolversParentTypes['RefreshResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'Refresh', ParentType, ContextType>;
};

export type RegisterResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Register'] = ResolversParentTypes['Register']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RegisterResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegisterResult'] = ResolversParentTypes['RegisterResult']> = {
  __resolveType: TypeResolveFn<'AuthError' | 'Register', ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Auth']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserByResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserBy'] = ResolversParentTypes['UserBy']> = {
  entity?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDeletedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserDeleted'] = ResolversParentTypes['UserDeleted']> = {
  entity?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserDeletedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserDeletedResult'] = ResolversParentTypes['UserDeletedResult']> = {
  __resolveType: TypeResolveFn<'UserDeleted' | 'UserNotFound', ParentType, ContextType>;
};

export type UserNotFoundResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserNotFound'] = ResolversParentTypes['UserNotFound']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  __resolveType: TypeResolveFn<'UserBy' | 'UserNotFound', ParentType, ContextType>;
};

export type UserUpdatedResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserUpdated'] = ResolversParentTypes['UserUpdated']> = {
  entity?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserUpdatedResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserUpdatedResult'] = ResolversParentTypes['UserUpdatedResult']> = {
  __resolveType: TypeResolveFn<'UserNotFound' | 'UserUpdated', ParentType, ContextType>;
};

export type UsersResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Users'] = ResolversParentTypes['Users']> = {
  entities?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UsersResult'] = ResolversParentTypes['UsersResult']> = {
  __resolveType: TypeResolveFn<'UserNotFound' | 'Users', ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Admin?: AdminResolvers<ContextType>;
  AdminBy?: AdminByResolvers<ContextType>;
  AdminDeleted?: AdminDeletedResolvers<ContextType>;
  AdminDeletedResult?: AdminDeletedResultResolvers<ContextType>;
  AdminNotFound?: AdminNotFoundResolvers<ContextType>;
  AdminResult?: AdminResultResolvers<ContextType>;
  AdminUpdated?: AdminUpdatedResolvers<ContextType>;
  AdminUpdatedResult?: AdminUpdatedResultResolvers<ContextType>;
  Admins?: AdminsResolvers<ContextType>;
  AdminsResult?: AdminsResultResolvers<ContextType>;
  Auth?: AuthResolvers<ContextType>;
  AuthError?: AuthErrorResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Login?: LoginResolvers<ContextType>;
  LoginResult?: LoginResultResolvers<ContextType>;
  Logout?: LogoutResolvers<ContextType>;
  LogoutResult?: LogoutResultResolvers<ContextType>;
  Manager?: ManagerResolvers<ContextType>;
  ManagerBy?: ManagerByResolvers<ContextType>;
  ManagerNotFound?: ManagerNotFoundResolvers<ContextType>;
  ManagerRemoved?: ManagerRemovedResolvers<ContextType>;
  ManagerRemovedResult?: ManagerRemovedResultResolvers<ContextType>;
  ManagerResult?: ManagerResultResolvers<ContextType>;
  ManagerUpdated?: ManagerUpdatedResolvers<ContextType>;
  ManagerUpdatedResult?: ManagerUpdatedResultResolvers<ContextType>;
  Managers?: ManagersResolvers<ContextType>;
  ManagersResult?: ManagersResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  PostBy?: PostByResolvers<ContextType>;
  PostCreated?: PostCreatedResolvers<ContextType>;
  PostCreatedResult?: PostCreatedResultResolvers<ContextType>;
  PostNotFound?: PostNotFoundResolvers<ContextType>;
  PostRemoved?: PostRemovedResolvers<ContextType>;
  PostRemovedResult?: PostRemovedResultResolvers<ContextType>;
  PostResult?: PostResultResolvers<ContextType>;
  PostUpdated?: PostUpdatedResolvers<ContextType>;
  PostUpdatedResult?: PostUpdatedResultResolvers<ContextType>;
  Posts?: PostsResolvers<ContextType>;
  PostsResult?: PostsResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Refresh?: RefreshResolvers<ContextType>;
  RefreshResult?: RefreshResultResolvers<ContextType>;
  Register?: RegisterResolvers<ContextType>;
  RegisterResult?: RegisterResultResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserBy?: UserByResolvers<ContextType>;
  UserDeleted?: UserDeletedResolvers<ContextType>;
  UserDeletedResult?: UserDeletedResultResolvers<ContextType>;
  UserNotFound?: UserNotFoundResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserUpdated?: UserUpdatedResolvers<ContextType>;
  UserUpdatedResult?: UserUpdatedResultResolvers<ContextType>;
  Users?: UsersResolvers<ContextType>;
  UsersResult?: UsersResultResolvers<ContextType>;
};

