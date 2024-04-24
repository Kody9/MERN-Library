const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

router.get('/available', async (req, res) => {
  try {
    const books = await Book.find({ status: 'available' });
    console.log(books);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).send(error.message);
  }
});

router.get('/all', async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).send('Error fetching all books: ' + error.message);
  }
});

router.get('/checked-out', async (req, res) => {
  const books = await Book.find({ status: 'checked out' });
  res.json(books);
});

router.post('/checkout', async (req, res) => {
  const { id, checkedOutBy } = req.body;
  
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14); // Set due date to two weeks from now

  try {
    const book = await Book.findByIdAndUpdate(id, {
      status: 'checked out',
      checkedOutBy,
      dueDate: twoWeeksLater  // Automatically setting the due date
    }, { new: true });

    res.json(book);
  } catch (error) {
    console.error("Error checking out book:", error);
    res.status(500).send('Error checking out book: ' + error.message);
  }
});

router.post('/checkin', async (req, res) => {
  const { id } = req.body;
  const book = await Book.findByIdAndUpdate(id, { status: 'available', checkedOutBy: null, dueDate: null }, { new: true });
  res.json(book);
});

module.exports = router;
