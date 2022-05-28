import 'dotenv/config';
import { schema, permissions } from '@config/schema';
import { applyMiddleware } from 'graphql-middleware';
import { initializeApolloExpress } from '@config/apollo';
import { initializeDatabaseConnection } from '@config/db';

const initializeServer = async (): Promise<void> => {
  const generatedSchema = applyMiddleware(schema, permissions);
  initializeApolloExpress(generatedSchema);
  await initializeDatabaseConnection();
};

initializeServer();
