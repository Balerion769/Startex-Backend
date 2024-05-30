const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Book = require('../models/Book');

// Upload and process CSV file to add books
exports.uploadBooks = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const books = [];
  const filePath = path.join(__dirname, '../../', req.file.path);

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      const { title, author, price } = row;
      books.push({ title, author, price, sellerId: req.user.id });
    })
    .on('end', async () => {
      try {
        await Book.bulkCreate(books);
        res.status(201).json({ message: 'Books uploaded successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error uploading books', error });
      } finally {
        fs.unlinkSync(filePath); // Delete the uploaded CSV file after processing
      }
    });
};

// exports.getBooks = async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     res.json(books);
//   } catch (error) {
//     res.status(400).json({ message: 'Error retrieving books', error });
//   }
// };

// exports.getBook = async (req, res) => {
//   try {
//     const book = await Book.findByPk(req.params.id);
//     if (!book) return res.status(404).json({ message: 'Book not found' });
//     res.json(book);
//   } catch (error) {
//     res.status(400).json({ message: 'Error retrieving book', error });
//   }
// };

// exports.updateBook = async (req, res) => {
//   try {
//     const book = await Book.findByPk(req.params.id);
//     if (!book || book.sellerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

//     await book.update(req.body);
//     res.json({ message: 'Book updated successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error updating book', error });
//   }
// };

// exports.deleteBook = async (req, res) => {
//   try {
//     const book = await Book.findByPk(req.params.id);
//     if (!book || book.sellerId !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

//     await book.destroy();
//     res.json({ message: 'Book deleted successfully' });
//   } catch (error) {
//     res.status(400).json({ message: 'Error deleting book', error });
//   }
// };
