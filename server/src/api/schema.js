const { mergeTypes } = require('merge-graphql-schemas');

const baseTypes = require('./baseSchema');
const flashcardTypes = require('./flashcard/flashcardSchema');
const packTypes = require('./pack/packSchema');

const types = [baseTypes, flashcardTypes, packTypes];

module.exports = mergeTypes(types);