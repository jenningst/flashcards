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
    fetchPacks: async function(_, { owner }) {
      const packs = await Pack.find({ owner });
      if (packs) {
        return packs.map(pack => {
          return { ...pack._doc, _id: pack.id };
        });
      } else {
        return [];
      }
    },
    fetchPackByPackId: async function(_, { owner, pack_id }) {
      const pack = await Pack
        .findById(pack_id)
        .where('owner').equals(owner);
      if (pack) {
        return { ...pack._doc, _id: pack.id };
      } else {
        return null;
      }
    },
  },
  Mutation: {
    createPack: async function(_, { input }) {
      const { name, owner } = input;
      let response = { pack: null, details: {} };
      const newPack = new Pack({
        name,
        owner,
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