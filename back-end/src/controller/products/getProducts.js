const { StatusCodes } = require('http-status-codes');
const { products } = require('../../database/models');

const getAllProducts = async (_req, res, _next) => {
  try {
    const productsList = await products.findAll();
    return res.status(StatusCodes.OK).json(productsList);
  } catch (e) {
    console.error(e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error' });
  }
};

const getProductsById = async (req, res, _next) => {
  const { id } = req.params;
  try {
    const product = await products.findByPk(id);

    if (!product) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not Found' });

    return res.status(StatusCodes.OK).json(product);
  } catch (e) {
    console.error(e.message);
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Error' });
  }
};

module.exports = { getAllProducts, getProductsById };
