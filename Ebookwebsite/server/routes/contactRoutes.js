import express from 'express';
import { Contact } from '../models/index.js';

const router = express.Router();

// GET all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// GET a single contact submission by ID (admin only)
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// POST a new contact submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    await Contact.create({
      name,
      email,
      subject,
      message
    });
    
    res.status(201).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact form', error: error.message });
  }
});

// Mark contact as responded (admin only)
router.patch('/:id/respond', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    contact.responded = true;
    await contact.save();
    
    res.status(200).json({ message: 'Contact marked as responded' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// DELETE a contact submission (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }
    
    await contact.destroy();
    res.status(200).json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

export default router; 