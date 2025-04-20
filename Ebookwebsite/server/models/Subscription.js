import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Subscription = sequelize.define('Subscription', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  unsubscribeToken: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

export default Subscription; 