import 'dotenv/config';
import express, { Request, Response, request as req, response as res } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import depthLimit from 'graphql-depth-limit';
import compression from 'compression';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { ApolloServer } from 'apollo-server-express';
import { GraphQLSchema } from 'graphql';
import { applyMiddleware } from 'graphql-middleware';
import { morgan, limiter, dataloader } from '@middlewares';
import { schema as gqlSchema, permissions as gqlPermissions } from '@config/schema';

const generatedSchema: GraphQLSchema = applyMiddleware(gqlSchema, gqlPermissions);

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan);
app.use(compression());
app.use('/graphql', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());

interface Context {
  req: Request;
  res: Response;
  dataloader: typeof dataloader;
}

const gqlContext = async (): Promise<Context> => ({
  req,
  res,
  dataloader,
});

const apolloServerInit = async () => {
  const server = new ApolloServer({
    introspection: true,
    debug: true,
    context: gqlContext,
    schema: generatedSchema,
    plugins: [responseCachePlugin()],
    validationRules: [depthLimit(7)],
    formatError: (err) => {
      if (err.message.startsWith('Database Error: ')) {
        return new Error('Internal server error');
      }
      return err;
    },
  });
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: { credentials: true },
  });
  return server;
};

export default apolloServerInit;
