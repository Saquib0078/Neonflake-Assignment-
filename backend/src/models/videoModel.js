const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 200,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  videoPublicId: {
    type: String,
  },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

