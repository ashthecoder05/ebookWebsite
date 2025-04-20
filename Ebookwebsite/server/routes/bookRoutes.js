import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { Book } from '../models/index.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads');
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    // Create unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to accept only PDFs and images
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'pdf') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Not a PDF file! Please upload only PDFs.'), false);
    }
  } else if (file.fieldname === 'coverImage') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image file! Please upload only images.'), false);
    }
  } else {
    cb(new Error('Unexpected field'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

// Routes
// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
});

// GET single book by ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
});

// POST a new book with PDF and cover image
router.post('/', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    if (!req.files || !req.files.pdf || !req.files.coverImage) {
      return res.status(400).json({ message: 'PDF and cover image are required' });
    }

    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      genre: req.body.genre,
      price: req.body.price || 0,
      isFree: req.body.isFree === 'true',
      pdfPath: `/uploads/${req.files.pdf[0].filename}`,
      coverImage: `/uploads/${req.files.coverImage[0].filename}`,
      featured: req.body.featured === 'true'
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
});

// PUT (update) a book
router.put('/:id', upload.fields([
  { name: 'pdf', maxCount: 1 },
  { name: 'coverImage', maxCount: 1 }
]), async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Prepare update object
    const updateData = {
      title: req.body.title || book.title,
      author: req.body.author || book.author,
      description: req.body.description || book.description,
      genre: req.body.genre || book.genre,
      price: req.body.price || book.price,
      isFree: req.body.isFree === 'true' ? true : (req.body.isFree === 'false' ? false : book.isFree),
      featured: req.body.featured === 'true' ? true : (req.body.featured === 'false' ? false : book.featured)
    };

    // Update PDF if provided
    if (req.files && req.files.pdf) {
      // Delete old PDF if exists
      if (book.pdfPath) {
        const oldFilePath = path.join(__dirname, '..', book.pdfPath);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      updateData.pdfPath = `/uploads/${req.files.pdf[0].filename}`;
    }

    // Update cover image if provided
    if (req.files && req.files.coverImage) {
      // Delete old image if exists
      if (book.coverImage) {
        const oldFilePath = path.join(__dirname, '..', book.coverImage);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      updateData.coverImage = `/uploads/${req.files.coverImage[0].filename}`;
    }

    // Update the book in the database
    await book.update(updateData);
    
    // Fetch the updated book to return
    const updatedBook = await Book.findByPk(req.params.id);
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});

// DELETE a book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Delete associated files
    if (book.pdfPath) {
      const pdfPath = path.join(__dirname, '..', book.pdfPath);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }

    if (book.coverImage) {
      const imagePath = path.join(__dirname, '..', book.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the book
    await book.destroy();
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

export default router; 