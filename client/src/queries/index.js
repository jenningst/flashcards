const { gql } = require('apollo-boost');

const GET_PACKS = gql`
  query fetchPacks($owner: String!) {
    fetchPacks(owner: $owner) {
      _id
      name
    }
  }
`;

const GET_PACK_BY_ID = gql`
  query fetchPackByPackId($owner: String!, $pack_id: String!) {
    fetchPackByPackId(owner: $owner, pack_id: $id) {
      _id
      name
    }
  }
`;

const GET_FLASHCARDS_BY_PACK = gql`
  query fetchFlashcardsByPackId($owner: String!, $pack_id: String!) {
    fetchFlashcardsByPackId(owner: $owner, pack_id: $id) {
      _id
      text
      answer
      owner
      pack_id
    }
  }
`;

const CREATE_PACK = gql`
  mutation createPack($input: CreatePackInput!) {
    createPack(input: $input) {
      pack {
        _id
        name
      }
      details {
        code
        success
        message
      }
    }
  }
`;

const CREATE_FLASHCARD = gql`
  mutation createFlashcard($input: CreateFlashcardInput!) {
    createFlashcard(input: $input) {
      card {
        _id
        text
        answer
        owner
        pack_id
      }
      details {
        code
        success
        message
      }
    }
  }
`;

export {
  GET_PACKS,
  GET_PACK_BY_ID,
  CREATE_PACK,
  CREATE_FLASHCARD,
  GET_FLASHCARDS_BY_PACK
};