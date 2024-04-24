const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publisher: String,
  isbn: String,
  status: String, // 'available' or 'checked out'
  checkedOutBy: String,
  dueDate: Date,
});

module.exports = mongoose.model('Books', bookSchema, 'Books');
