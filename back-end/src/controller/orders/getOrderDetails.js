const { StatusCodes } = require('http-status-codes');
const { sales, products } = require('../../database/models');

const getAllOrders = async (_req, res, _next) => {
  try {
    const ordersDetails = await sales.findAll({
      include: [
      {
        model: products,
        as: 'products',
        attributes: { exclude: ['url_image'] },
      }],
    });
  
    return res.status(StatusCodes.OK).json(ordersDetails);
  } catch (e) {
    return console.error(e.message);
  }
};

const getOrdersById = async (req, res, _next) => {
  const { id } = req.params;

  const orderDetails = await sales.findByPk(id, {
    include: [
    {
      model: products,
      as: 'products',
      attributes: { exclude: ['url_image'] },
    }],
  });

  if (!orderDetails) return res.status(StatusCodes.BAD_REQUEST).end();

  return res.status(StatusCodes.OK).json(orderDetails);
};

module.exports = { getAllOrders, getOrdersById };
