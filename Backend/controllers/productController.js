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

// ตอนนี้ต้องอัปเดตรูปด้วยถึงจะสามารถอัปโหลดได้
// อีก way นึงคือแยกอัปรูปกับอัปเดตรายการต่างๆ
exports.updateProduct = async (req, res, next) => {
  try {
    const { productId, wetSkuId, drySkuId, honeySkuId } = req.params;
    const {
      name,
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
    console.log(req.body);
    console.log(req.file);
    if (req?.file?.path) {
      const result = await uploadPromise(req.file.path);
      const rows = await Product.update(
        {
          name,
          description,
          imageUrl: result.secure_url,
        },
        { where: { id: productId } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
      fs.unlinkSync(req?.file?.path);
    } else {
      const rows = await Product.update(
        {
          name,
          description,
        },
        { where: { id: productId } }
      );
      if (!rows) return res.status(400).json({ message: 'Id does not match' });
    }

    const skuRow1 = await Sku.update(
      {
        process: wetprocess,
        price: wetprice,
        status: wetstatus,
        productId,
      },
      {
        where: { id: wetSkuId },
      }
    );
    if (!skuRow1) return res.status(400).json({ message: 'Id does not match' });
    const skuRow2 = await Sku.update(
      {
        process: dryprocess,
        price: dryprice,
        status: drystatus,
        productId,
      },
      {
        where: { id: drySkuId },
      }
    );
    if (!skuRow2) return res.status(400).json({ message: 'Id does not match' });
    const skuRow3 = await Sku.update(
      {
        process: honeyprocess,
        price: honeyprice,
        status: honeystatus,
        productId,
      },
      {
        where: { id: honeySkuId },
      }
    );
    if (!skuRow3) return res.status(400).json({ message: 'Id does not match' });

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
