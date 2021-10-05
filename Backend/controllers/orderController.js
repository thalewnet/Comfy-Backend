const {
  Order,
  User,
  Shipment,
  Cart,
  Sku,
  Product,
  OrderItem,
} = require('../models');
const { uploadPromise } = require('../controllers/uploadCloud');

// Get order by admin role on admin page
exports.getAllOrder = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Shipment,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

// Get order by user on order user page
exports.getEachUserOrder = async (req, res, next) => {
  try {
    // const { id: userId } = req.headers;
    const orders = await Order.findAll({
      where: { userId: 1 },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName'],
        },
        {
          model: Shipment,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: OrderItem,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: Sku,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: {
              model: Product,
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          },
        },
      ],
    });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};
exports.getOrderbyId = async (req, res, next) => {};

// create order and orderitem from cartitem
exports.createOrder = async (req, res, next) => {
  try {
    const { id: userId } = req.headers;
    const body = req.body;
    const shipment = await OrderItem.create({
      userId,
      address,
      phoneNumber: phonenumber,
      subdistrict,
      district,
      province,
      comment,
    });
    const order = await Order.create({
      userId,
      shipmentId: shipment.id,
      totalPrice,
      paymentSlip: req.file.path,
    });
    const order2 = await OrderItem.bulkCreate([
      {
        // หลายไอเท็ม
      },
    ]);
  } catch (err) {
    next(err);
  }
};

// Admin update order status
exports.updateOrder = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {};
