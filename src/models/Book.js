const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./user');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  sellerId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
});

User.hasMany(Book, { as: 'books', foreignKey: 'sellerId' });
Book.belongsTo(User, { as: 'seller', foreignKey: 'sellerId' });

module.exports = Book;
