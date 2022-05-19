import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  # Scalars
  scalar ObjectId
  scalar DateTime

  # Types
  type {{capitalizedName}} {
    _id: ObjectId
    # Add your fields here #
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
  ## Created {{capitalizedName}}
  type {{capitalizedName}}Created {
    entity: {{capitalizedName}}!
    message: String!
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
  input {{capitalizedName}}CreatedInput {
    # Add your fields here #
  }
  input {{capitalizedName}}UpdatedInput {
    # Add your fields here #
  }

  # Unions
  union {{capitalizedName}}Result = {{capitalizedName}}By | {{capitalizedName}}NotFound
  union {{capitalizedName}}sResult = {{capitalizedName}}s | {{capitalizedName}}NotFound
  union {{capitalizedName}}CreatedResult = {{capitalizedName}}Created | {{capitalizedName}}NotFound
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
    create{{capitalizedName}}(input: {{capitalizedName}}CreatedInput!): {{capitalizedName}}CreatedResult!
    update{{capitalizedName}}(id: ObjectId!, input: {{capitalizedName}}UpdatedInput!): {{capitalizedName}}UpdatedResult!
    remove{{capitalizedName}}(id: ObjectId!): {{capitalizedName}}RemovedResult!
  }
`;
