# EbookWebsite - Backend API

This is the backend API for the Ebook Website. It provides endpoints for handling PDF books, storing newsletter subscriptions, and managing contact form submissions.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL (with Sequelize ORM)
- Multer (for file uploads)
- JWT (for authentication)

## Setup Instructions

1. Make sure you have Node.js (v14 or later) and PostgreSQL installed on your system.

2. Create a PostgreSQL database named `ebookwebsite`.

3. Navigate to the server directory:
   ```
   cd server
   ```

4. Install dependencies:
   ```
   npm install
   ```

5. Configure environment variables:
   - Create a `.env` file in the server directory if it doesn't exist
   - Add the following variables:
     ```
     PORT=5000
     DB_USERNAME=postgres
     DB_PASSWORD=postgres
     DB_NAME=ebookwebsite
     DB_HOST=localhost
     DB_PORT=5432
     JWT_SECRET=your_secret_key_here
     NODE_ENV=development
     ```
   - Adjust the database credentials as needed for your PostgreSQL installation

6. Start the development server:
   ```
   npm run dev
   ```

The server will start on http://localhost:5000 by default and will automatically create the necessary database tables on the first run.

## API Endpoints

### Books

- `GET /api/books` - Get all books
- `GET /api/books/:id` - Get a single book by ID
- `POST /api/books` - Add a new book (requires PDF file and cover image)
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

### Newsletter Subscriptions

- `GET /api/subscribe` - Get all subscriptions
- `POST /api/subscribe` - Add a new subscription
- `GET /api/subscribe/unsubscribe/:token` - Unsubscribe with token
- `DELETE /api/subscribe/:id` - Delete a subscription

### Contact Form

- `GET /api/contact` - Get all contact submissions
- `GET /api/contact/:id` - Get a single contact submission
- `POST /api/contact` - Submit a new contact form
- `PATCH /api/contact/:id/respond` - Mark a contact as responded
- `DELETE /api/contact/:id` - Delete a contact submission

## Folder Structure

- `models/` - Sequelize data models
- `routes/` - API route definitions
- `config/` - Database configuration
- `uploads/` - Directory for uploaded files (PDFs and images)
- `server.js` - Main application entry point