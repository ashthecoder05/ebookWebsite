import { sequelize } from '../config/database.js';
import Book from './Book.js';
import Contact from './Contact.js';
import Subscription from './Subscription.js';

// Import other models as needed

// Define model relationships if needed
// For example:
// Book.belongsTo(Author);
// Author.hasMany(Book);

// Function to sync all models with the database
const syncModels = async (force = false) => {
  try {
    await sequelize.sync({ force });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Failed to synchronize models:', error);
  }
};

export {
  Book,
  Contact,
  Subscription,
  syncModels
}; 