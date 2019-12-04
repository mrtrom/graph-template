import { gql } from 'apollo-server-express';

export = {
  rootTypeDefs: gql`
    type Query
    type Mutation
    schema {
      query: Query
      mutation: Mutation
    }
  `
};