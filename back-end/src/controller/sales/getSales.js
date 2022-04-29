const { StatusCodes } = require('http-status-codes');
const { sales } = require('../../database/models');

const getSales = async (req, res) => {
  try {
    const salesList = await sales.findAll();
    return res.status(StatusCodes.OK).json(salesList);
  } catch (e) {
    return console.error(e.message);
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;

    const sale = await sales.findByPk(id, { 
      attributes: { 
        exclude: ['delivery_address', 'delivery_number', 'user_id', 'seller_id'], 
      },
    });
    if (!sale) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Not Found' });

    return res.status(StatusCodes.OK).json(sale);
  } catch (e) {
    return console.error(e.message);
  }
};

const getSalesCustomer = async (req, res) => {
  try {
    const { id } = req;
    const salesList = await sales.findAll({ 
      where: { userId: id },
      attributes: { 
        exclude: ['deliveryAddress', 'deliveryNumber', 'userId', 'sellerId'], 
      },
    });
    return res.status(StatusCodes.OK).json(salesList);
  } catch (e) {
    return console.error(e.message);
  }
};

module.exports = { getSaleById, getSales, getSalesCustomer };
