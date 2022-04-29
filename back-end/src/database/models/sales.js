const Sales = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sales', {
    totalPrice: DataTypes.DECIMAL(10, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId'
    });
    Sale.belongsTo(models.users, {
      as: 'seller',
      foreignKey: 'sellerId'
    });
  }

  return Sale;
}

module.exports = Sales