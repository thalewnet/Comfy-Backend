const { Cart, Sku, Product } = require('../models');
exports.getProductInCart = async (req, res, next) => {
  try {
    // const { id } = req.headers;
    const result = await Cart.findAll({
      where: { userId: 1, status: false },
      include: {
        model: Sku,
        attributes: ['process', 'price'],
        include: {
          model: Product,
          attributes: ['name', 'type'],
        },
      },
    });
    res.json({ cartlist: result });
  } catch (err) {
    next(err);
  }
};
exports.createProductCart = async (req, res, next) => {
  try {
    // const { id: userId } = req.headers;
    const { roast, grind, weight, amount, price, id: skuId, userId } = req.body;
    const result = await Cart.create({
      roast,
      grind,
      weight,
      amount,
      price,
      skuId,
      userId,
    });
    res.status(200).json({ message: 'Create Success', Cart: result });
  } catch (err) {
    next(err);
  }
};
