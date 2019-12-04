import { SchemaDirectiveVisitor } from 'apollo-server-express';
import config from '../config';

const jsonwebtoken = require('jsonwebtoken');

class IsAuthenticatedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: any, details: any) {
    field.resolve = async function (result: any, args: any, context: any, info: any) {
      if (context && context.headers && context.headers.authorization) {
        const tokenId = context.headers.authorization.replace('Bearer ', '');
        const decoded = jsonwebtoken.verify(tokenId, config.secret);

        if (decoded.username) {
          return result[field.name];
        }
      }
    };
  }
}

export = IsAuthenticatedDirective;