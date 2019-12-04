import { gql } from 'apollo-server-express';

export = {
  movieTypeDefs: gql`
    type Actor {
      name: String
      birthday: String
      country: String
      directors: [Director]
    }

    type Director {
      name: String
      birthday: String
      country: String
    }

    type Movie {
      id: ID
      title: String!
      year: String!
      rating: String!
      _rating: String @isAuthenticated
      actors: [Actor]
    }

    input MovieFilterInput {
      limit: Int
    }

    extend type Query {
      movies(filter: MovieFilterInput): [Movie]
    }`
};