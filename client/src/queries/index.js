import { gql } from 'apollo-boost';

const GET_PACKS = gql`
  query fetchPacks {
    fetchPacks {
      _id
      name
    }
  }
`;

const GET_PACK_BY_ID = gql`
  query fetchPackById($id: String!) {
    fetchPack(id: $id) {
      name
    }
  }
`;

const GET_FLASHCARDS_BY_PACK = gql`
  query fetchFlashcardsByPack($id: String!) {
    fetchFlashcardsByPack(id: $id) {
      _id
      text
      answer
      user_id
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
        user_id
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