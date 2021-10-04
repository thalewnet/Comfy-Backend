module.exports = (sequelize, DataTypes) => {
  const Sku = sequelize.define(
    'Sku',
    {
      process: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL(15, 2),
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      underscored: true,
    }
  );

  Sku.associate = (models) => {
    Sku.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'skuId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Sku.hasMany(models.Cart, {
      foreignKey: {
        name: 'skuId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
    Sku.belongsTo(models.Product, {
      foreignKey: {
        name: 'productId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Sku;
};
