const Pack = require('./packModel');

module.exports = {
  PackPayload: {
    __resolveType(obj, context, info) {
      if(obj.pack) {
        return 'Pack'
      }
      return null;
    },
  },
  Query: {
    fetchPacks: async function() {
      const packs = await Pack.find({});
      return packs.map(pack => {
        return { ...pack._doc, _id: pack.id };
      });
    },
  },
  Mutation: {
    createPack: async function(_, { input }) {
      let response = { pack: null, details: {} };
      const newPack = new Pack({
        name: input.name,
      });

      try {
        let createdPack = await newPack.save();
        response.pack = { ...createdPack._doc, _id: createdPack.id };
        response.details = {
          code: 201,
          success: true,
          message: `New pack created with id [${response.pack._id}]`,
        };
      } catch (error) {
          response.details = {
          code: 500,
          success: false,
          message: `Failed to save pack with error: [${error}]`
        };
      }
      return response;
    }
  }
}