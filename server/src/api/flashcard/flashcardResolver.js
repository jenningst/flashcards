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
    fetchFlashcards: async function() {
      const cards = await Flashcard.find({});
      return cards.map(card => {
        return { ...card._doc, _id: card.id };
      });
    },
  },
  Mutation: {
    createFlashcard: async function(_, { input }) {
      const { text, answer } = input;
      let response = { card: null, details: {} };
      const newFlashcard = new Flashcard({
        text, 
        answer,
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