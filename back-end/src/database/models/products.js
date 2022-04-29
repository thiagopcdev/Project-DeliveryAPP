const Products = (sequelize, DataTypes) => {
  const Product = sequelize.define('products', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    url_image: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });

  return Product
}

module.exports = Products;