// Requirements
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }

// Creating the comment model
Comment.init(
  {
    // Id Creation
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Comment creation
    comment_text: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // User Id creation
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    // Post Id creation
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    // Create sequelize table
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

// Export the comment model
module.exports = Comment;