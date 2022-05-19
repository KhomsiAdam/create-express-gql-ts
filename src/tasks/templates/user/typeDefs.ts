import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalars
  scalar ObjectId
  scalar DateTime

  # Types
  type {{capitalizedName}} {
    _id: ObjectId
    firstname: String
    lastname: String
    email: String
    role: Auth
    createdAt: DateTime
    updatedAt: DateTime
  }
  ## {{capitalizedName}} by id/field
  type {{capitalizedName}}By {
    entity: {{capitalizedName}}!
  }
  ## All {{capitalizedName}}s
  type {{capitalizedName}}s {
    entities: [{{capitalizedName}}!]!
  }
  ## Updated {{capitalizedName}}
  type {{capitalizedName}}Updated {
    entity: {{capitalizedName}}!
    message: String!
  }
  ## Removed {{capitalizedName}}
  type {{capitalizedName}}Removed {
    entity: {{capitalizedName}}!
    message: String!
  }
  ## Not found
  type {{capitalizedName}}NotFound {
    message: String!
  }

  # Inputs
  input {{capitalizedName}}UpdatedInput {
    firstname: String
    lastname: String
  }

  # Unions
  union {{capitalizedName}}Result = {{capitalizedName}}By | {{capitalizedName}}NotFound
  union {{capitalizedName}}sResult = {{capitalizedName}}s | {{capitalizedName}}NotFound
  union {{capitalizedName}}UpdatedResult = {{capitalizedName}}Updated | {{capitalizedName}}NotFound
  union {{capitalizedName}}RemovedResult = {{capitalizedName}}Removed | {{capitalizedName}}NotFound

  # Queries
  type Query {
    getAll{{capitalizedName}}s(sort: SortInput, filter: FilterInput, paginate: PaginationInput): {{capitalizedName}}sResult!
    get{{capitalizedName}}ById(id: ObjectId!): {{capitalizedName}}Result!
    get{{capitalizedName}}ByField(field: String!, value: String!): {{capitalizedName}}Result!
  }

  # Mutations
  type Mutation {
    update{{capitalizedName}}(id: ObjectId!, input: {{capitalizedName}}UpdatedInput!): {{capitalizedName}}UpdatedResult!
    remove{{capitalizedName}}(id: ObjectId!): {{capitalizedName}}RemovedResult!
  }
`;
