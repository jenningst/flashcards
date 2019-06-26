const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSchema = new Schema({
  name: String,
  image: String,
  flashcardCount: Number,
});

module.exports = mongoose.model('Pack', packSchema);