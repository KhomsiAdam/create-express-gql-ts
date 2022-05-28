import { Request } from 'express';
import morgan from 'morgan';
import { log } from '@services/logger.service';

// Use custom Winston logger
const stream = {
  write: (message: string) => log.http(message.substring(0, message.lastIndexOf('\n'))),
};

// Skip all the Morgan http log if app is not running in development
const skip = (req: Request) => {
  const env = process.env.NODE_ENV || 'development';
  // Skip log if the GraphQL operation is 'IntrospectionQuery' or if request method is 'OPTIONS' or 'GET
  if (req.body && req.body.operationName && req.body.operationName === 'IntrospectionQuery') return true;
  if (req.method === 'OPTIONS' || req.method === 'GET') return true;
  return env !== 'development';
};

// Log GraphQL operations (query/mutation)
morgan.token('graphql-query', (req: Request) => {
  if (!req.body) return '';
  const { query, operationName } = req.body;
  if (!query) return '';
  const queryName = operationName || query.split(' ')[1];
  const operationType = query.split(' ')[0];
  return `${operationType}: ${queryName}`;
});

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string, and stream
  ':method :url :status - :graphql-query - :response-time ms',
  { stream, skip },
);

export default morganMiddleware;
