const { uploadPromise } = require('../controllers/uploadCloud');
const { Product, Sku } = require('../models');
const fs = require('fs');

exports.getAllProduct = async (req, res, next) => {
  try {
    const { type } = req.query;
    if (type) {
      const products = await Product.findAll({
        where: { type, isDeleted: false },
      });
      res.json({ products: products });
    } else {
      const products = await Product.findAll();
      res.json({ products: products });
    }
  } catch (err) {
    next(err);
  }
};

// สำหรับดึงข้อมูลไปสร้างหน้าเลือก ข้อมูล
exports.getProductbyId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt', 'isDeleted'] },
      include: {
        model: Sku,
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });
    res.json({ products: product });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      type,
      description,
      wetprocess,
      dryprocess,
      honeyprocess,
      wetprice,
      dryprice,
      honeyprice,
      wetstatus,
      drystatus,
      honeystatus,
    } = req.body;

    const result = await uploadPromise(req.file.path);
    fs.unlinkSync(req.file.path);
    const product = await Product.create({
      name,
      type,
      description,
      imageUrl: result.secure_url,
    });

    const sku = await Sku.bulkCreate([
      {
        process: wetprocess,
        price: wetprice ? wetprice : null,
        status: wetstatus,
        productId: product.id,
      },
      {
        process: dryprocess,
        price: dryprice ? dryprice : null,
        status: drystatus,
        productId: product.id,
      },
      {
        process: honeyprocess,
        price: honeyprice ? honeyprice : null,
        status: honeystatus,
        productId: product.id,
      },
    ]);
    res.json({ message: 'Ceeate complete', product, sku });
  } catch (err) {
    console.log(err);
    // next(err);
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const { productId, skuId } = req.params;
    const { name, description, process, price, status } = req.body;
    // const result = await uploadPromise(req.file.path);
    const rows = await Product.update(
      {
        name,
        description,
        imageUrl: 'dasdsadasdad',
        // imageUrl: result.secure_url,
      },
      { where: { id: productId } }
    );
    if (!rows) return res.status(400).json({ message: 'Id does not match' });
    const rows2 = await Sku.update(
      {
        process,
        price,
        status,
        productId,
      },
      {
        where: { id: skuId },
      }
    );
    if (!rows2) return res.status(400).json({ message: 'Id does not match' });
    res.status(201).json({ message: 'Updated success' });
  } catch (err) {
    next(err);
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Product.update({ isDeleted: true }, { where: { id } });
    if (!rows) return res.status(400).json({ message: 'Id does not Match' });
    res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
