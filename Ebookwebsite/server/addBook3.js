import { Book } from './models/index.js';
import { testConnection } from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get the directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Book details
const bookData = {
  title: 'THE AI AVENGERS - RISE OF THE AI AGENT',
  author: 'Medium Blog',
  description: `This story weaves together the Marvel Avengers universe with fundamental concepts of artificial intelligence agents to create a narrative that is both entertaining and educational. Throughout the ten chapters, I've incorporated various AI agent principles from the document, bringing technical concepts to life through the lens of superheroes and villains.

Key AI Agent Concepts Explored:
Rational Agents: Both Project Sentinel and Thanos's Proxima Protocol demonstrate how AI agents make rational decisions based on their perceptions and data to produce optimal performance. Tony's creation processes environmental data through digital interfaces to make informed decisions without human intervention.

Agent Architecture Components: The story illustrates the three key components of AI agent architecture:
Architecture: The physical or software base (Project Sentinel's systems, Thanos's digital infiltrators)
Agent Function: The decision-making process (how collected data translates into actions)
Agent Program: The implementation (how the agent executes its functions)

Types of AI Agents:
Simple Reflex Agents: Basic programs following predetermined rules (mentioned as primitive versions compared to Thanos's advanced infiltrators)
Model-Based Reflex Agents: Project Sentinel builds internal models of network threats to evaluate potential outcomes
Goal-Based Agents: The Proxima Protocol agents determine their own paths to achieve Thanos's predetermined goals
Utility-Based Agents: Thanos's infiltrators evaluate different scenarios and choose actions that maximize success chances
Learning Agents: Both sides develop agents that adapt based on experience and feedback
Hierarchical Agents: The story demonstrates how complex tasks are distributed among multiple specialized agents

AI Agent Workflow:
Goal Determination: How agents break down complex objectives into actionable tasks
Information Acquisition: How agents gather necessary data for decision-making
Task Implementation: How agents methodically execute planned tasks
Agent Transition Between Domains: The story explores how advanced agents bridge digital and physical realms, extending perception capabilities to include physical sensors and actuators.

Challenges of AI Deployment:
Data Privacy Concerns: The risk of infiltration and data compromise
Ethical Challenges: The philosophical contrast between Thanos's approach and the Avengers'
Technical Complexities: The sophisticated nature of developing and countering advanced AI agents
Resource Requirements: The computational demands of deploying advanced AI systems

Advanced Concepts:
Emergent Behavior: How individual agent actions combine to produce complex, coordinated outcomes
Meta-Learning: Agents learning how to learn more effectively
Human-AI Collaboration: The synergy between human judgment and AI capabilities.

The story culminates in a philosophy that suggests the most powerful approach to artificial intelligence is neither complete autonomy nor total control, but a partnership where human creativity and ethical judgment complement AI's processing power and pattern recognition. This hybrid "centaur" model represents the balance the Avengers achieve in their fight against Thanos's more dominating approach to AI.`,
  genre: 'Artificial Intelligence Concepts',
  price: 0,
  isFree: true,
  pdfPath: '/uploads/book3.pdf',
  coverImage: '/uploads/coverpage3.png',
  featured: false
};

// Function to add the book to the database
const addBook = async () => {
  try {
    console.log('Starting to add book to database...');
    
    // Check if files exist
    const uploadsDir = path.join(__dirname, 'uploads');
    const pdfPath = path.join(uploadsDir, 'book3.pdf');
    const coverPath = path.join(uploadsDir, 'coverpage3.png');
    
    console.log('Checking if files exist:');
    console.log(`PDF path: ${pdfPath}`);
    console.log(`Cover path: ${coverPath}`);
    
    if (!fs.existsSync(pdfPath)) {
      console.error(`PDF file not found at: ${pdfPath}`);
      return;
    }
    
    if (!fs.existsSync(coverPath)) {
      console.error(`Cover image not found at: ${coverPath}`);
      return;
    }
    
    console.log('Files exist, proceeding with database connection...');
    
    // Test database connection
    await testConnection();
    console.log('Database connection successful');
    
    // Create the book
    console.log('Creating book record with data:', bookData);
    const newBook = await Book.create(bookData);
    console.log('Book added successfully:', newBook.toJSON());
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error('Error adding book:', error);
    console.error('Error details:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
};

// Run the function
addBook(); 