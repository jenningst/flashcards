const { gql } = require('apollo-server-express');

// TODO: implement delete or modify

const flashcard = gql`
  type Flashcard {
    _id: ID!
    text: String!
    answer: String!
    user_id: String
    pack_id: String
  }

  input CreateFlashcardInput {
    text: String!
    answer: String!
    user_id: String
    pack_id: String
  }

  interface FlashcardPayload {
    card: Flashcard
    details: DetailsPayload
  }

  type CreateFlashcardPayload implements FlashcardPayload {
    card: Flashcard
    details: DetailsPayload
  }
`;

module.exports = flashcard;