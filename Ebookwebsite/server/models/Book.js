import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  pdfPath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  coverImage: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  isFree: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  releaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});

export default Book; 