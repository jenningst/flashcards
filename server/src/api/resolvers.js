const { mergeResolvers } = require('merge-graphql-schemas');

const flashcardResolver = require('./flashcard/flashcardResolver');
const packResolver = require('./pack/packResolver');

const resolvers = [packResolver, flashcardResolver];

module.exports = mergeResolvers(resolvers);