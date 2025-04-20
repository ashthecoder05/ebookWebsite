import { Book } from './models/index.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const addBook2 = async () => {
  try {
    // Create a new book entry pointing to the existing book2.pdf
    const newBook = await Book.create({
      title: "Shiva and the Learning Astra: A Tale of Reinforcement Learning",
      author: "Research Paper",
      description: "In crafting Shiva and the Learning Astra, I wanted to create a story that makes reinforcement learning—a complex concept in artificial intelligence—accessible through adventure and mythology. The Astraverse serves as a metaphorical landscape where the principles of reinforcement learning come alive.The core concept illustrated here is how systems (whether human or artificial) learn through experience rather than programming. Just as Shiva and Isha navigate the forest through trial and error, collecting rewards and learning from failures, reinforcement learning algorithms improve through interaction with their environment.The moral of the story extends beyond technical understanding: true wisdom comes not from avoiding mistakes but from learning through them. Each experience—success or failure—contributes to growth. The Learning Astra represents this fundamental truth that spans both ancient wisdom traditions and cutting-edge technology.By embedding these ideas in an adventure featuring relatable characters with extraordinary abilities, I hope readers will grasp not just how reinforcement learning works technically, but also appreciate how its principles mirror our human journey of continuous learning, adaptation, and growth.",
      genre: "Artificial Intelligence Concepts",
      price: 0,
      isFree: true,
      pdfPath: "/uploads/book2.pdf", // Path to the existing file
      coverImage: "/uploads/coverpage2.png", // Using existing cover image
      featured: false
    });

    console.log('Book2 added successfully to database:', newBook.toJSON());
    process.exit(0);
  } catch (error) {
    console.error('Error adding book2 to database:', error);
    process.exit(1);
  }
};

// Run the function
addBook2(); 