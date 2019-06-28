import { gql } from 'apollo-boost';

export const GET_PACKS = gql`
  query fetchPacks {
    fetchPacks {
      _id,
      name
    }
  }
`;

export const GET_FLASHCARDS_BY_PACK = gql`
  query fetchFlashcardsByPack($id) {
    fetchFlashcardsByPack(id: $id) {
      _id
      text
      answer
      user_id
      pack_id
    }
  }
`;

export const CREATE_PACK = gql`
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

export const CREATE_FLASHCARD = gql`
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