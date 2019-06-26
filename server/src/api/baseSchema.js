const { gql } = require('apollo-server-express');

const base = gql`
  type Query {
    fetchPacks: [Pack!]!
    fetchFlashcards: [Flashcard!]!
  }

  type Mutation {
    createPack(input: CreatePackInput!): CreatePackPayload!
    createFlashcard(input: CreateFlashcardInput!): CreateFlashcardPayload!
  }

  type DetailsPayload {
    code: String!
    success: Boolean!
    message: String!
    ## any other error fields we need
  }
`;

module.exports = base;