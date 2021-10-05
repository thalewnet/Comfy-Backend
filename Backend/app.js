const express = require('express');
require('dotenv').config();
const app = express();
const orderRoute = require('./routes/orderRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const cartRoute = require('./routes/cartRoute');
const serviceRoute = require('./routes/serviceRoute');
const errorController = require('./controllers/errorController');
// const { sequelize } = require('./models');
const cors = require('cors');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static('public'));
// sequelize.sync({ force: true });
// sequelize.sync();
// Middleware cors => allow access cross origin
app.use(cors());

app.use('/services', serviceRoute);
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
