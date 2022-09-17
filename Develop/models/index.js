// import models
const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')
const sequelize = require('../config/connection.js')

// Products belongsTo Category
Product.belongsTo(Category, {
  foreign_key: 'category_id',
})
// Categories have many Products
Category.hasMany(Product, {
  foreign_key: 'product_id',
})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: { module: ProductTag, unique: false } })

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: { module: ProductTag, unique: false } })

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
}
