import { Book } from './models/index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const updateBook2 = async () => {
  try {
    // Find book with ID 2
    const book = await Book.findByPk(2);
    
    if (!book) {
      console.error('Book with ID 2 not found');
      process.exit(1);
    }
    
    // Update the book details
    await book.update({
      title: "Shiva and the Learning Astra",
      author: "medium blog for reinforcement learning",
      description: "In crafting \"Shiva and the Learning Astra,\" I wanted to create a story that makes reinforcement learning—a complex concept in artificial intelligence—accessible through adventure and mythology. The Astraverse serves as a metaphorical landscape where the principles of reinforcement learning come alive.\nThe core concept illustrated here is how systems (whether human or artificial) learn through experience rather than programming. Just as Shiva and Isha navigate the forest through trial and error, collecting rewards and learning from failures, reinforcement learning algorithms improve through interaction with their environment.\nThe moral of the story extends beyond technical understanding: true wisdom comes not from avoiding mistakes but from learning through them. Each experience—success or failure—contributes to growth. The Learning Astra represents this fundamental truth that spans both ancient wisdom traditions and cutting-edge technology.\nBy embedding these ideas in an adventure featuring relatable characters with extraordinary abilities, I hope readers will grasp not just how reinforcement learning works technically, but also appreciate how its principles mirror our human journey of continuous learning, adaptation, and growth.",
      coverImage: "/uploads/coverpage2.png"
    });

    console.log('Book2 updated successfully:', book.toJSON());
    process.exit(0);
  } catch (error) {
    console.error('Error updating book2:', error);
    process.exit(1);
  }
};

// Run the function
updateBook2(); 