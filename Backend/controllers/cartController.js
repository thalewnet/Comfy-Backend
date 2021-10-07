const { Cart, Sku, Product } = require('../models');
exports.getProductInCart = async (req, res, next) => {
  try {
    const user = req.user;
    const result = await Cart.findAll({
      where: { userId: user.id, status: false },
      include: {
        model: Sku,
        attributes: ['process', 'price'],
        include: {
          model: Product,
          attributes: ['name', 'type', 'imageUrl', 'id'],
        },
      },
    });
    res.json({ cartlist: result });
  } catch (err) {
    next(err);
  }
};

exports.getProductCartById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Cart.findOne({
      where: { id },
      include: { model: Sku, attributes: ['process', 'price', 'productId'] },
    });
    res.status(200).json({ cart: result });
  } catch (err) {
    next(err);
  }
};
exports.createProductCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { roast, grind, weight, amount, price, skuId, productId } = req.body;
    console.log('*****************************************');
    const result = await Cart.create({
      roast,
      grind,
      weight,
      amount,
      price,
      skuId: +skuId,
      userId: user.id,
      productId: +productId,
    });
    res.status(200).json({ message: 'Create Success', cart: result });
  } catch (err) {
    next(err);
  }
};

exports.deleteProductCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log('***************************');
    await Cart.destroy({ where: { id } });
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

exports.updateProductCart = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { roast, grind, weight, amount, price, skuId } = req.body;
    await Cart.update(
      { roast, grind, weight, amount, price, skuId: +skuId, userId: user.id },
      { where: { id } }
    );

    res.status(201).json({ message: 'UpdatedSuccess' });
  } catch (err) {
    next(err);
  }
};
