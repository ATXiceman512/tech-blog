// Requirements
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    // Post id creation
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Post title creation
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Post content creation
    post_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // User Id creation
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    // Create sequelize table
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

// Export the post model
module.exports = Post;