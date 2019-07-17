const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packSchema = new Schema({
  name: String,
  owner: String,
});

module.exports = mongoose.model('Pack', packSchema);