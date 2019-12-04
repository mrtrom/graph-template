import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const config = require('./lib/config');

const AuthDirective = require('./lib/directives/requireAuthDirective');
const TypeDefinitions = require('./lib/type_definitions');
const Resolvers = require('./lib/resolvers')(config);

const server = new ApolloServer({
  typeDefs: TypeDefinitions,
  resolvers: Resolvers,
  schemaDirectives: {
    isAuthenticated: AuthDirective,
  },
  formatError(error: any) {
    console.log(error);
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log(JSON.stringify(error, undefined, 2));
    }
    return error;
  },
  context: async ({ req }) => {
    return { headers: req.headers };
  },
});

const app = express();
app.use(cors());

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);