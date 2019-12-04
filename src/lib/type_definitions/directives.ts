import { gql } from 'apollo-server-express';

export = {
  directivesTypeDefs: gql`
    directive @isAuthenticated on FIELD_DEFINITION
  `
};