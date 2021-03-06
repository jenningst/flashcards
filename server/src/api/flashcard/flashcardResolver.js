const Flashcard = require('./flashcardModel');

module.exports = {
  FlashcardPayload: {
    __resolveType(obj) {
      if (obj.card) {
        return 'Flashcard'
      }
      return null;
    }
  },
  Query: {
    fetchFlashcardsByPackId: async function(_, { owner, pack_id }) {
      const cards = await Flashcard
        .find({ pack_id })
        .where('owner').equals(owner);
      if (cards) {
        return cards.map(card => {
          return { ...card._doc, _id: card.id };
        });
      } else {
        return [];
      }
    },
  },
  Mutation: {
    createFlashcard: async function(_, { input }) {
      const { text, answer, owner, pack_id } = input;
      let response = { card: null, details: {} };
      const newFlashcard = new Flashcard({
        text, 
        answer,
        owner,
        pack_id,
      });

      try {
        let createFlashcard = await newFlashcard.save();
        response.card = { ...createFlashcard._doc, _id: createFlashcard.id };
        response.details = {
          code: 201,
          success: true,
          message: `New card created with id [${response.card._id}]`,
        };
      } catch (error) {
          response.details = {
          code: 500,
          success: false,
          message: `Failed to save card with error: [${error}]`
        };
      }
      return response;
    }
  }
}