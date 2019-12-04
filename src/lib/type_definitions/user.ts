import { gql } from 'apollo-server-express';

export = {
  userTypeDefs: gql`
    type User {
      id: ID
      username: String!
      password: String!
      name: String
    }

    input UserFilterInput {
      limit: Int
    }

    type UserOutput {
      token: String
      user: User
    }

    extend type Query {
      users(filter: UserFilterInput): [User]
    }

    extend type Mutation {
      createUser(username: String, password: String): UserOutput
      login(username: String, password: String): UserOutput
    }`
};