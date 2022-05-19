import 'dotenv/config';
import { initializeExpress } from '@config/apollo';
import { schema, permissions } from '@config/schema';
import { applyMiddleware } from 'graphql-middleware';
import { initializeDatabaseConnection } from '@config/db';

const initializeServer = async (): Promise<void> => {
  const generatedSchema = applyMiddleware(schema, permissions);
  initializeExpress(generatedSchema);
  await initializeDatabaseConnection();
};

initializeServer();
