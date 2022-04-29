const express = require('express');
const cors = require('cors');
const path = require('path');
// const { getImage } = require('../controller/products/getProducts');
const {
  userRoute,
  loginRoute,
  productsRoute,
  saleRoute,
  orderRoute,
} = require('../routes');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PUT', 'DELETE'],
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/images', express.static(path.join(__dirname, '../../public')));

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/users', userRoute);
app.use('/login', loginRoute);
app.use('/products', productsRoute);
app.use('/sales', saleRoute);
app.use('/orders', orderRoute);

module.exports = app;
