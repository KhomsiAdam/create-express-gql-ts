// Get entity name from graphql operation (query/mutation) to dynamically query data related to that entity
export const getEntityFromOperation = (entities: Array<string>, operation: string) =>
  entities.find((entity) => operation.includes(entity));
