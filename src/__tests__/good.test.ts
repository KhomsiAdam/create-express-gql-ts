import { ApolloServer, gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    good: String!
  }
`;

const resolvers = {
  Query: {
    good: () => 'Good. 👌',
  },
};

describe('Good. 👌', () => {
  const testServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  it('Good. 👌', async () => {
    const response = await testServer.executeOperation({
      query: 'query Good { good }',
    });
    expect(response.errors).toBeUndefined();
    expect(response.data?.good).toBe('Good. 👌');
  });
});
