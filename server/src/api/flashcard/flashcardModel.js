const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  text: String,
  answer: String,
  owner: String,
  pack_id: String,
});

module.exports = mongoose.model('Flashcard', flashcardSchema);