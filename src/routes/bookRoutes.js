const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', authMiddleware('seller'), upload.single('file'), bookController.uploadBooks);
router.get('/', authMiddleware(), bookController.getBooks);
router.get('/:id', authMiddleware(), bookController.getBook);
router.put('/:id', authMiddleware('seller'), bookController.updateBook);
router.delete('/:id', authMiddleware('seller'), bookController.deleteBook);

module.exports = router;
