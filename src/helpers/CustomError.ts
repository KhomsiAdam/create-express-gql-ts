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
