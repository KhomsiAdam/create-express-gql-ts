import http from 'http';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import depthLimit from 'graphql-depth-limit';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { log } from '@services/logger.service';
import { morgan } from '@middlewares';
import { context } from './context';

const port = process.env.PORT || 4000;

export const initializeApolloExpress = async (schema: GraphQLSchema) => {
  const app = express();
  app.use(compression());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: process.env.NODE_ENV !== 'development',
      contentSecurityPolicy: process.env.NODE_ENV !== 'development',
    }),
  );
  app.use(cookieParser());
  // app.use('/graphql', limiter);
  app.use(express.json({ limit: '10kb' }));
  app.use(mongoSanitize());
  app.use(morgan);

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    introspection: process.env.NODE_ENV !== 'production',
    context,
    schema,
    csrfPrevention: true,
    plugins: [responseCachePlugin(), ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(7)],
    formatError: (err) => {
      if (err.message.startsWith('Database Error:')) {
        return new Error('Internal server error');
      }
      return err;
    },
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: true,
      credentials: true,
    },
  });

  httpServer.listen(port, async () => {
    log.info(`Server ready at: http://localhost:${port}${server.graphqlPath}`);
  });
};
