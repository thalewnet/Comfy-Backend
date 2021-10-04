const express = require('express');
require('dotenv').config();
const app = express();
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const errorController = require('./controllers/errorController');
// const { sequelize } = require('./models');
const cors = require('cors');
const { District } = require('./models');
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));
// sequelize.sync({ force: true });
// sequelize.sync();
// Middleware cors => allow access cross origin
app.use(cors());

app.get('/provinces', async (req, res, next) => {
  try {
    const result = await District.findAll({
      attributes: ['province'],
      group: ['province'],
    });
    const provinceList = result.map((item) => item.province);

    res.json({ provinces: provinceList });
  } catch (err) {
    next(err);
  }
});

app.get('/districts', async (req, res, next) => {
  try {
    const { province } = req.query;
    const result = await District.findAll({
      where: { province: province },
      attributes: ['amphoe'],
      group: ['amphoe'],
    });
    const amphoeList = result.map((item) => item.amphoe);
    console.log(amphoeList);
    res.json({ amphoeList });
  } catch (err) {
    next(err);
  }
});

app.get('/subdistricts', async (req, res, next) => {
  try {
    const { amphoe, province } = req.query;
    const result = await District.findAll({
      where: { amphoe, province },
      attributes: ['district', 'zipcode'],
      group: ['district'],
    });
    const districtLists = result.map((item) => item.district);
    console.log(districtLists);
    res.json({ districtLists, zipcode: result[0].zipcode });
  } catch (err) {
    next(err);
  }
});

app.use('/carts', cartRoute);
app.use('/orders', orderRoute);
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/', authRoute);
//Page not found 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'this resource is not found' });
});

// Error MiddleWare
app.use(errorController);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
