const SalesProducts = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProducts',
  { quantity: DataTypes.INTEGER },
  {
    timestamps: false,
    underscored: true,
    tableName: 'salesProducts'
  });

  SaleProduct.associate = (models) => {
    models.sales.belongsToMany(models.products, {
      as: 'products',
      foreignKey: 'saleId',
      through: SaleProduct,
      otherKey: 'productId'
    });
    models.products.belongsToMany(models.sales, {
      as: 'sales',
      foreignKey: 'productId',
      through: SaleProduct,
      otherKey: 'saleId'
    });
  }
  return SaleProduct;
}

module.exports = SalesProducts
