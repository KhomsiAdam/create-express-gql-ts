<p align="center">
  <img src="https://user-images.githubusercontent.com/9354045/169316293-a3185c08-960f-48ea-ae83-12df6c26582f.svg" alt="Typescript Node Express GraphQL API"></img>
</p>
<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/license-MIT--Clause-brightgreen.svg?style=flat-square" alt="Software License"></img>
  </a>
  <a href="https://github.com/KhomsiAdam/create-express-gql-ts/releases">
    <img src="https://img.shields.io/github/release/KhomsiAdam/create-express-gql-ts.svg?style=flat-square" alt="Latest Version"></img>
  </a>
</p>
  
# Introduction

Create a maintainable and scalable Node.js GraphQL API with TypeScript, Express, Mongoose and Apollo Server.

The project structure is based on MVC and follows it's basic principles but is a little bit different in which instead of having the entities logic spread out into specific folders (models folder containing all models, controllers folder containing all controllers etc...).

Each entity has it's own folder containing all it's core logic in isolation from other entities. Let's take the `User` entity as an example:

```
src
└── entities
    └── user
        ├── constants.ts
        ├── interface.ts
        ├── model.ts
        ├── permission.ts
        ├── resolvers.ts
        ├── typeDefs.ts
        └── validation.ts
```

With this structure it is easier to maintain and scale with multiple entities (you will rarely have to switch between folders in order to manage one entity).

The project comes with many built-in features, such as:

- Authentication with [JWT](https://www.npmjs.com/package/jsonwebtoken): providing both an access token and refresh token (sent as a secure http only cookie and saved in the database).
- Unified login system for support of multiple roles of users.
- Validation using [Joi](https://joi.dev/).
- [Jest](https://jestjs.io/) for unit and integration testing.
- Entity folder/files generation with a custom script.
- [PM2](https://pm2.keymetrics.io/) as a process manager.
- Seeding data examples.
- Logger with [winston](https://www.npmjs.com/package/winston) and [morgan](https://www.npmjs.com/package/morgan).
- Custom Error/Response handling.
- Filtering, sorting, pagination.
- [GraphQL Codegen](https://www.graphql-code-generator.com/) to generate typed queries, mutations, resolvers from schema.
- [GraphQL Shield](https://www.graphql-shield.com/) to handle permissions and authorizations.
- [GraphQL Dataloader](https://github.com/graphql/dataloader) as a layer for batching and caching data.
- more details below...

# Table of Contents

<!--ts-->

- [Setup](#setup)
  - [Usage](#usage)
  - [Configuration](#configuration)
- [Directory Structure](#directory-structure)
- [Scripts](#scripts)
- [Features](#features)
- [Contributions](#contributions)
<!--te-->

# Setup

## Usage

To create a project, simply run:

```bash
npx create-express-gql-ts my-app
```

or for a quick start if you are using vscode:

```bash
npx create-express-gql-ts my-app
cd my-app
code .
```

Alternatively, you can clone the repository (or download or use as a template):

```bash
git clone https://github.com/KhomsiAdam/create-express-gql-ts.git
```

Then open the project and run the following command in your terminal to install the required dependencies:

```bash
yarn
```

[Back to top](#table-of-contents)

## Configuration

Setup your environment variables. In your root directory, you will find a `.env.example` file. Copy and/or rename to `.env` or:

```
cp .env.example .env
```

Then:

```bash
yarn dev
```

The database should be connected and your server should be running at `http://localhost:${port}/graphql`. You can start testing and querying the API.

```bash
yarn test:good
```

[Back to top](#table-of-contents)

# Directory Structure

```
src/
├── __tests__/                  # Groups all your integration tests and the testing server
├── config/                     # Apollo server, context, database and schema configuration
├── entities/                   # Contains all entities (generated entities end up here with `yarn entity`)
├── generated/                  # Typed queries, mutation resolvers... by GraphQL code generator
├── helpers/                    # Any utility or helper functions/methods go here
├── middlewares/                # Express & Apollo middlewares
├── seeders/                    # Data seeders examples
├── services/                   # Contains mostly global and reusable logic (such as auth and crud)
├── tasks/                      # Scripts (contains the script to generate entities based of templates)
│   └── templates/              # Contains entity templates (default and user type)
├── types/                      # Custom/global type definitions
└── index.ts                    # App entry point (initializes database connection and express server)
```

[Back to top](#table-of-contents)

# Scripts

- Run compiled javascript production build (requires build):

```bash
yarn start
```

<hr>

- Run compiled javascript production build with pm2 in cluster mode (requires build):

```bash
yarn start:pm2
```

<hr>

- Compiles typescript into javascript and build your app:

```bash
yarn build
```

<hr>

- Run the typescript development build:

```bash
yarn dev
```

<hr>

- Run the typescript development build with the `--trace-sync-io` tag to detect any synchronous I/O:

```bash
yarn dev:sync
```

<hr>

- Run the typescript development build with PM2:

```bash
yarn dev:pm2
```

<hr>

- Seed an Admin:

```bash
yarn seed:admin
```

<hr>

- Seed fake users based on json data file:

```bash
yarn seed:users
```

<hr>

- Generate an entity based of either the default or user template (prompts for a template selection and entity name, then create it's folder under `src/entities`)

```bash
yarn entity
```

\*Entities created have their constants, resolvers (with basic crud), permissions all automatically setup from the provided name. The interface, model, typeDefs and validation need to be filled with the needed fields.

<hr>

- Eslint (lint, lint and fix):

```bash
yarn lint
```

```bash
yarn lint:fix
```

<hr>

- Jest (all, unit, integration, coverage, watch, watchAll):

```bash
yarn test
```

```bash
yarn test:unit
```

```bash
yarn test:int
```

```bash
yarn test:coverage
```

```bash
yarn test:watch
```

```bash
yarn test:watchAll
```

<hr>

- PM2 (kill, monit):

```bash
yarn kill
```

```bash
yarn monit
```

<hr>

- GraphQL Code Generator:

```bash
yarn gen
```

```bash
yarn gen:watch
```

<hr>

- Commitizen:

```bash
yarn cz
```

[Back to top](#table-of-contents)

# Features

## Entities

let's imagine we generated a `Post` entity with the `default` template `src/entities/post`:

```
src
└── entities
    └── post
        ├── constants.ts
        ├── interface.ts
        ├── model.ts
        ├── permission.ts
        ├── resolvers.ts
        ├── typeDefs.ts
        └── validation.ts
```

It's constants, resolvers, permissions are all ready and setup:

`src/entities/post/constants.ts`:

```typescript
export enum SuccessMessages {
  POST_CREATED = 'Post created successfully.',
  POST_UPDATED = 'Post updated successfully.',
  POST_DELETED = 'Post deleted successfully.',
}

export enum ErrorMessages {
  POSTS_NOT_FOUND = 'No posts found.',
  POST_NOT_FOUND = 'Post was not found.',
}
```

`src/entities/post/resolvers.ts`:

```typescript
import * as resolver from '@services/crud.service';
import type {
  Resolvers,
  PostResult,
  PostsResult,
  PostCreatedResult,
  PostUpdatedResult,
  PostRemovedResult,
} from '@generated/types';
import { PostModel } from './model';
import { ErrorMessages, SuccessMessages } from './constants';
import { createPostSchema, updatePostSchema } from './validation';

export const resolvers: Resolvers = {
  Query: {
    getAllPosts: async (_parent, args): Promise<PostsResult> =>
      resolver.getAll(PostModel, args, ErrorMessages.POSTS_NOT_FOUND, 'Posts', 'PostNotFound'),
    getPostById: async (_parent, args): Promise<PostResult> =>
      resolver.getById(PostModel, args.id, ErrorMessages.POST_NOT_FOUND, 'PostBy', 'PostNotFound'),
    getPostByField: async (_parent, args): Promise<PostResult> =>
      resolver.getByField(PostModel, args.field, args.value, ErrorMessages.POST_NOT_FOUND, 'PostBy', 'PostNotFound'),
  },

  Mutation: {
    createPost: async (_parent, args): Promise<PostCreatedResult> =>
      resolver.create(
        PostModel,
        args.input,
        createPostSchema,
        SuccessMessages.POST_CREATED,
        'PostCreated',
        'PostNotFound',
      ),
    updatePost: async (_parent, args): Promise<PostUpdatedResult> =>
      resolver.update(
        PostModel,
        args.id,
        args.input,
        updatePostSchema,
        SuccessMessages.POST_UPDATED,
        ErrorMessages.POST_NOT_FOUND,
        'PostUpdated',
        'PostNotFound',
      ),
    removePost: async (_parent, args): Promise<PostRemovedResult> =>
      resolver.remove(
        PostModel,
        args.id,
        SuccessMessages.POST_DELETED,
        ErrorMessages.POST_NOT_FOUND,
        'PostRemoved',
        'PostNotFound',
      ),
  },
};
```

`src/entities/post/typeDefs.ts`:

```typescript
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalars
  scalar ObjectId
  scalar DateTime

  # Types
  type Post {
    _id: ObjectId
    # Add your fields here #
    createdAt: DateTime
    updatedAt: DateTime
  }
  ## Post by id/field
  type PostBy {
    entity: Post!
  }
  ## All Posts
  type Posts {
    entities: [Post!]!
  }
  ## Created Post
  type PostCreated {
    entity: Post!
    message: String!
  }
  ## Updated Post
  type PostUpdated {
    entity: Post!
    message: String!
  }
  ## Removed Post
  type PostRemoved {
    entity: Post!
    message: String!
  }
  ## Not found
  type PostNotFound {
    message: String!
  }

  # Inputs
  input PostCreatedInput {
    # Add your fields here #
  }
  input PostUpdatedInput {
    # Add your fields here #
  }

  # Unions
  union PostResult = PostBy | PostNotFound
  union PostsResult = Posts | PostNotFound
  union PostCreatedResult = PostCreated | PostNotFound
  union PostUpdatedResult = PostUpdated | PostNotFound
  union PostRemovedResult = PostRemoved | PostNotFound

  # Queries
  type Query {
    getAllPosts(sort: SortInput, filter: FilterInput, paginate: PaginationInput): PostsResult!
    getPostById(id: ObjectId!): PostResult!
    getPostByField(field: String!, value: String!): PostResult!
  }

  # Mutations
  type Mutation {
    createPost(input: PostCreatedInput!): PostCreatedResult!
    updatePost(id: ObjectId!, input: PostUpdatedInput!): PostUpdatedResult!
    removePost(id: ObjectId!): PostRemovedResult!
  }
`;
```

\*After generating your entity, you should complete the definitions by adding your fiels under the main type and for the create and update inputs. For each operation the type of data we could get as a result is defined using an union type.

`src/entities/post/permission.ts`:

```typescript
import { is } from '@middlewares/rules';
import { or } from 'graphql-shield';

const permission = {
  Query: {
    getAllPosts: is.Auth,
    getPostById: is.Auth,
    getPostByField: is.Auth,
  },
  Mutation: {
    createPost: is.Auth,
    updatePost: or(is.Own, is.Admin),
    removePost: or(is.Own, is.Admin),
  },
};

export default permission;
```

\*Most operations by default have the `is.Auth` middleware that require a user to be authenticated to access them, you can either omit it if you want an operation to be public or use the `allow` rule from `graphql-shield`. You can specify which user role is allowed (`is.Admin` or `is.User`) and also use operators such as `or`, `and`.

`src/middlewares/rules.ts`:

```typescript
import { rule } from 'graphql-shield';
import { IRuleConstructorOptions } from 'graphql-shield/dist/types';
import { verifyAuth } from '@services/auth.service';
import { Roles, Permissions } from '@entities/auth/constants';

const options: IRuleConstructorOptions = { cache: 'contextual' };

export const is = {
  Auth: rule(options)(async (_parent, _args, context) => verifyAuth(context.req)),
  Self: rule(options)(async (_parent, args, context) => verifyAuth(context.req, '', Permissions.SELF, args.id)),
  Own: rule(options)(async (_parent, args, context) => verifyAuth(context.req, '', Permissions.OWN, args.id)),
  User: rule(options)(async (_parent, _args, context) => verifyAuth(context.req, Roles.USER)),
  Admin: rule(options)(async (_parent, _args, context) => verifyAuth(context.req, Roles.ADMIN)),
};
```

*The `is.Self` is for a user to operate resolvers that are targeted at himself.
*The `is.Own` is for a user to handle an entity he owns so that no other user can operate it with the help of:

`src/helpers/getEntityFromOperation.ts`:

```typescript
// Get entity name from graphql operation (query/mutation) to dynamically query data related to that entity
export const getEntityFromOperation = (entities: Array<string>, operation: string) =>
  entities.find((entity) => operation.includes(entity));
```

\*It is required for operations to be properly named as it is good practice. But it is also used here to get the name of the entity: `const entityName = getEntityFromOperation(modelNames(), req.body.operationName);`. `modelNames()` from `mongoose` gets us all the entity names in our database. `req.body.operationName` gets us the name of the operation requestes for example: `UpdatePost`. The method will return `Post` as the entity name so we can find if the entity requested is owned by the user performing the operation.

The interface, model and validation will have to be filled by the needed fields much like the typeDefs.

`src/entities/post/interface.ts`:

```typescript
export interface PostEntity {}
```

`src/entities/post/model.ts`:

```typescript
import { Schema, model } from 'mongoose';

import { PostEntity } from './interface';

const PostSchema = new Schema<PostEntity>({}, { timestamps: true });

export const PostModel = model<PostEntity>('Post', PostSchema);
```

`src/entities/post/validation.ts`:

```typescript
import Joi from 'joi';

export const createPostSchema = Joi.object({});

export const updatePostSchema = Joi.object({});
```

The `user` entity template slightly differs from the default one as it is destined for another type of user (another role for example).

Using:

```bash
yarn entity
```

Let's create a `Manager` entity with the `user` template `src/entities/manager`.

`src/entities/manager/constants.ts`:

```typescript
export enum SuccessMessages {
  MANAGER_UPDATED = 'Manager updated successfully.',
  MANAGER_DELETED = 'Manager deleted successfully.',
}

export enum ErrorMessages {
  MANAGERS_NOT_FOUND = 'No managers found.',
  MANAGER_NOT_FOUND = 'Manager was not found.',
}

export const SALT_ROUNDS = 12;
```

`src/entities/manager/interface.ts`:

```typescript
import { Types } from 'mongoose';

export interface ManagerEntity {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  role?: Types.ObjectId;
}
```

`src/entities/manager/model.ts`:

```typescript
import { Schema, model } from 'mongoose';
import { genSalt as bcryptGenSalt, hash as bcryptHash } from 'bcryptjs';

import { AuthModel } from '@entities/auth/model';
import type { ManagerEntity } from './interface';
import { SALT_ROUNDS } from './constants';

const ManagerSchema = new Schema<ManagerEntity>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: 'Auth',
    },
  },
  { timestamps: true },
);

// Before creating a manager
ManagerSchema.pre('save', async function save(next) {
  // Only hash password if it has been modified or new
  if (!this.isModified('password')) return next();
  // Generate salt and hash password
  const salt = await bcryptGenSalt(SALT_ROUNDS);
  this.password = await bcryptHash(this.password, salt);
  next();
});
// After creating a manager
ManagerSchema.post('save', async (doc) => {
  // Create manager in auth collection
  await AuthModel.create({ email: doc.email, role: 'Manager' });
});
ManagerSchema.post('findOneAndDelete', async (doc) => {
  // Delete manager from auth collection
  await AuthModel.deleteOne({ email: doc.email });
});

export const ManagerModel = model<ManagerEntity>('Manager', ManagerSchema);
```

`src/entities/manager/validation.ts`:

```typescript
import Joi from 'joi';

export const managerSchema = Joi.object({
  firstname: Joi.string().alphanum().trim(),
  lastname: Joi.string().alphanum().trim(),
});
```

`src/entities/manager/permission.ts`:

```typescript
import { is } from '@middlewares/rules';
import { or } from 'graphql-shield';

const permission = {
  Query: {
    getAllManagers: is.Auth,
    getManagerById: is.Auth,
    getManagerByField: is.Auth,
  },
  Mutation: {
    updateManager: or(is.Self, is.Admin),
    removeManager: or(is.Self, is.Admin),
  },
};

export default permission;
```

`src/entities/manager/resolvers.ts`:

```typescript
import * as resolver from '@services/crud.service';
import type {
  Resolvers,
  ManagerResult,
  ManagersResult,
  ManagerUpdatedResult,
  ManagerRemovedResult,
} from '@generated/types';
import type { AuthData } from '@entities/auth/interface';
import { ManagerModel } from './model';
import { ErrorMessages, SuccessMessages } from './constants';
import { managerSchema } from './validation';

export const resolvers: Resolvers = {
  Query: {
    getAllManagers: async (_parent, args): Promise<ManagersResult> =>
      resolver.getAll(ManagerModel, args, ErrorMessages.MANAGERS_NOT_FOUND, 'Managers', 'ManagerNotFound'),
    getManagerById: async (_parent, args): Promise<ManagerResult> =>
      resolver.getById(ManagerModel, args.id, ErrorMessages.MANAGER_NOT_FOUND, 'ManagerBy', 'ManagerNotFound'),
    getManagerByField: async (_parent, args): Promise<ManagerResult> =>
      resolver.getByField(
        ManagerModel,
        args.field,
        args.value,
        ErrorMessages.MANAGER_NOT_FOUND,
        'ManagerBy',
        'ManagerNotFound',
      ),
  },

  Mutation: {
    updateManager: async (_parent, args): Promise<ManagerUpdatedResult> =>
      resolver.update(
        ManagerModel,
        args.id,
        args.input,
        managerSchema,
        SuccessMessages.MANAGER_UPDATED,
        ErrorMessages.MANAGER_NOT_FOUND,
        'ManagerUpdated',
        'ManagerNotFound',
      ),
    removeManager: async (_parent, args): Promise<ManagerRemovedResult> =>
      resolver.remove(
        ManagerModel,
        args.id,
        SuccessMessages.MANAGER_DELETED,
        ErrorMessages.MANAGER_NOT_FOUND,
        'ManagerRemoved',
        'ManagerNotFound',
      ),
  },

  Manager: {
    role: async ({ role }, _args, { dataloader }): Promise<AuthData> => dataloader.auth.load(role),
  },
};
```

\*[GraphQL Dataloader](https://github.com/graphql/dataloader) is used instead of relying on `.populate()` and offers better performance through batching and caching. After creating a new entity you should add it's own dataloader under `src/middlewares/loader.ts` (like below if we created a `Manager` and `Post` entities as examples):

```typescript
import DataLoader from 'dataloader';
import type { Model } from 'mongoose';
import { AuthModel } from '@entities/auth/model';
import { AdminModel } from '@entities/admin/model';
import { UserModel } from '@entities/user/model';
import { ManagerModel } from '@entities/manager/model';
import { PostModel } from '@entities/post/model';

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
  manager: createLoader(ManagerModel),
  post: createLoader(PostModel),
};
```

`src/entities/manager/typeDefs.ts`

```typescript
import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalars
  scalar ObjectId
  scalar DateTime

  # Types
  type Manager {
    _id: ObjectId
    firstname: String
    lastname: String
    email: String
    role: Auth
    createdAt: DateTime
    updatedAt: DateTime
  }
  ## Manager by id/field
  type ManagerBy {
    entity: Manager!
  }
  ## All Managers
  type Managers {
    entities: [Manager!]!
  }
  ## Updated Manager
  type ManagerUpdated {
    entity: Manager!
    message: String!
  }
  ## Removed Manager
  type ManagerRemoved {
    entity: Manager!
    message: String!
  }
  ## Not found
  type ManagerNotFound {
    message: String!
  }

  # Inputs
  input ManagerUpdatedInput {
    firstname: String
    lastname: String
  }

  # Unions
  union ManagerResult = ManagerBy | ManagerNotFound
  union ManagersResult = Managers | ManagerNotFound
  union ManagerUpdatedResult = ManagerUpdated | ManagerNotFound
  union ManagerRemovedResult = ManagerRemoved | ManagerNotFound

  # Queries
  type Query {
    getAllManagers(sort: SortInput, filter: FilterInput, paginate: PaginationInput): ManagersResult!
    getManagerById(id: ObjectId!): ManagerResult!
    getManagerByField(field: String!, value: String!): ManagerResult!
  }

  # Mutations
  type Mutation {
    updateManager(id: ObjectId!, input: ManagerUpdatedInput!): ManagerUpdatedResult!
    removeManager(id: ObjectId!): ManagerRemovedResult!
  }
`;
```

The `Manager` role should be added to the `Roles` constant `src/entities/auth/constants.ts`:

```typescript
export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGER = 'Manager',
}
```

\*It automatically get added into the `src/entities/auth/interface.ts` and `src/entities/auth/model.ts`.

Then optionally add another middleware `is.Manager` to check if user has a `Manager` role at `src/middlewares/rules.ts`:

```typescript
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
  Manager: rule(options)(async (_parent, _args, context) => verifyAuth(context.req, Roles.MANAGER)),
};
```

Now to create a user with a specified role, just send the role needed as part of the request body, it will automatically check if that role exists, if not the register will fail.

\*By default, registering creates user with a `User` role, and you cannot create a user with an `Admin` role with regular registering.

## Error & Response Handling

GraphQL handles responses and errors differently compared to REST. For example, if GraphQL doesn't find an entity, it will return `null` with a HTTP status code of 200. That's not very useful. Also this isn't really considered an error but just another type of response we could get. So we define under `src/entities/${entity}/typeDefs.ts` all possible responses and the type of data we could get as part of the schema using [union types](https://www.apollographql.com/docs/apollo-server/schema/unions-interfaces/).

`src/helpers/CustomError.ts`:

```typescript
import { ApolloError } from 'apollo-server-errors';

// Custom error Apollo class
export class CustomError extends ApolloError {
  constructor(message: string, statusCode: string) {
    super(message, statusCode);
    Object.defineProperty(this, 'name', { value: 'CustomError' });
  }
}

// Custom Apollo error status codes
export enum StatusCode {
  InvalidOperationName = 'INVALID_OPERATION_NAME',
  JsonWebTokenError = 'JWT_INVALID_TOKEN',
  SyntaxError = 'JWT_INVALID_SYNTAX',
  ExpiredToken = 'JWT_EXPIRED_TOKEN',
  SignatureError = 'JWT_INVALID_SIGNATURE',
  InvalidAlgorithm = 'JWT_INVALID_ALGORITHM',
}
```

\*This can be used to return custom apollo errors with a custom status code. You can return or throw already defined [apollo errors](https://www.apollographql.com/docs/apollo-server/data/errors/#error-codes) using their generic `ApolloError` class and/or it's subclasses.

```typescript
import { Types } from 'mongoose';

// Custom responses for GraphQL resolvers to match the different returned types
export const customResponse = {
  auth: (typeName: any, generatedToken: string, returnedRole: Types.ObjectId | string, resultMessage: string) => ({
    __typename: typeName,
    token: generatedToken,
    role: returnedRole,
    message: resultMessage,
  }),
  entities: (typeName: any, data: Array<object>, resultMessage = '') => ({
    __typename: typeName,
    entities: data,
    ...(resultMessage !== '' && { message: resultMessage }),
  }),
  entity: (typeName: any, data: object) => ({
    __typename: typeName,
    entity: data,
  }),
  operation: (typeName: any, data: object, resultMessage: string) => ({
    __typename: typeName,
    entity: data,
    message: resultMessage,
  }),
  message: (typeName: any, resultMessage: string) => ({
    __typename: typeName,
    message: resultMessage,
  }),
};
```

\*When running in development mode, the error response contains the message but also the error stack.

## Validation

Data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the folder for each entity. Let's take the `User` entity as an example so it would be in: `src/entities/user/validation.ts`:

## Logging

Import the logger from `src/services/logger.service.ts`. It is using the [winston](https://github.com/winstonjs/winston) logging library.

Logging should be done according to the following severity levels (ascending order from most important to least important):

```typescript
import { log } from '@services/logger.service';
log.error('error'); // level 0
log.warn('warning'); // level 1
log.info('information'); // level 2
log.http('http'); // level 3
log.debug('debug'); // level 4
```

In development mode, log messages of all severity levels will be printed to the console.

GraphQL operations are logged as HTTP requests using [morgan](https://github.com/expressjs/morgan): `src/middlewares/morgan.ts`

## WIP:

- Reset, forgot password.
- Email service.
- File upload.

[Back to top](#table-of-contents)

# Contributions

Contributions are welcome. To discuss any bugs, problems, fixes or improvements please refer to the [discussions](https://github.com/KhomsiAdam/create-express-ts-rest-api/discussions) section.

Before creating a pull request, make sure to open an [issue](https://github.com/KhomsiAdam/create-express-ts-rest-api/issues) first.

Committing your changes, fixes or improvements in a new branch with documentation will be appreciated.

## License

[MIT](LICENSE)
