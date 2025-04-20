import express from 'express';
import crypto from 'crypto';
import { Subscription } from '../models/index.js';

const router = express.Router();

// GET all subscriptions (protected route for admin use)
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
});

// POST a new subscription
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({
      where: { email }
    });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({ message: 'Email is already subscribed' });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        await existingSubscription.save();
        return res.status(200).json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Generate unsubscribe token
    const unsubscribeToken = crypto.randomBytes(32).toString('hex');
    
    // Create new subscription
    await Subscription.create({
      email,
      unsubscribeToken
    });

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing', error: error.message });
  }
});

// Unsubscribe route
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({
      where: { unsubscribeToken: req.params.token }
    });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Invalid token' });
    }

    subscription.isActive = false;
    await subscription.save();
    
    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unsubscribing', error: error.message });
  }
});

// DELETE a subscription (admin only)
router.delete('/:id', async (req, res) => {
  try {
    const subscription = await Subscription.findByPk(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    await subscription.destroy();
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error: error.message });
  }
});

export default router; 