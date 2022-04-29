const { StatusCodes } = require('http-status-codes');
const createSale = require('../sales/create');
const { createSaleProduct } = require('../../service');

module.exports = async (req, res) => {
  const { totalPrice, deliveryAddress, deliveryNumber, sellerId, orderDetails } = req.body;
  const { authorization } = req.headers;

  const saleId = await createSale({ 
    totalPrice, deliveryAddress, deliveryNumber, sellerId, authorization });

  if (!saleId) return res.status(StatusCodes.BAD_REQUEST).end();
  const createOrder = await createSaleProduct(orderDetails, saleId);

  if (!createOrder) return res.status(StatusCodes.BAD_REQUEST).end();
  return res.status(StatusCodes.CREATED).end();
};
