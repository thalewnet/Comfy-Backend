module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      paymentSlip: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      trackingNumber: {
        type: DataTypes.STRING,
      },
      totalPrice: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        validate: {
          isNumeric: true,
          gtZero(value) {
            if (value < 0) {
              throw new Error('Must be greater than zero');
            }
          },
        },
      },
      ispaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      issent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isverified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Order.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'orderId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });

    Order.belongsTo(models.Shipment, {
      foreignKey: {
        name: 'shipmentId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  };
  return Order;
};
