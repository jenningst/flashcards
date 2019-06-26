const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
  text: String,
  answer: String,
  user_id: String,
  pack_id: String,
});

module.exports = mongoose.model('Flashcard', flashcardSchema);