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
    const user = req.user;
    // const { id: userId } = req.headers;
    const orders = await Order.findAll({
      where: { userId: user.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
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
    const user = req.user;
    // console.log(`user`, user);
    const {
      address,
      comment,
      district,
      subdistrict,
      phonenumber,
      province,
      zipcode,
      arrcartid,
      totalprice,
    } = req.body;

    let arrCartIdToNum = [];
    if (typeof arrcartid === 'string') {
      const x = Array.from(arrcartid);
      arrCartIdToNum = x.map((item) => +item);
    } else {
      arrCartIdToNum = arrcartid.map((item) => +item);
    }
    const result = await uploadPromise(req.file.path);
    // console.log(`province`, province);
    const findCart = await Cart.findAll({
      where: { id: arrCartIdToNum },
      attributes: ['roast', 'grind', 'weight', 'amount', 'price', 'skuId'],
    });
    // // console.log(findCart);
    //****************** */
    const shipment = await Shipment.create({
      userId: user.id,
      address,
      phoneNumber: phonenumber,
      subdistrict,
      district,
      province,
      zipcode,
      comment,
    });
    // console.log('shipment', shipment);
    //********************** */
    const order = await Order.create({
      userId: user.id,
      shipmentId: shipment.id,
      totalPrice: totalprice,
      paymentSlip: result.secure_url,
    });
    // console.log('order', order);
    const newOrderItems = findCart.map((item) => {
      return { ...item.toJSON(), orderId: order.id };
    });
    console.log(`newOrderItems`, newOrderItems);
    const order2 = await OrderItem.bulkCreate(newOrderItems);
    await Cart.destroy({ where: { id: arrcartid } });
    fs.unlinkSync(req.file.path);
    res.status(200).json({ messsage: 'success' });
  } catch (err) {
    console.log(err);
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
