const { gql } = require('apollo-boost');

const base = gql`
  type Query {
    fetchPacks(owner: String!): [Pack]!
    fetchPackByPackId(owner: String!, pack_id: String!): Pack
    fetchFlashcardsByPackId(owner: String!, pack_id: String!): [Flashcard!]!
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