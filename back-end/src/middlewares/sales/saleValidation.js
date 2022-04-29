const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

module.exports = (req, res, next) => {
  try {
    const { totalPrice, deliveryAddress, deliveryNumber } = req.body;
    const { error } = Joi.object({
      totalPrice: Joi.number().required(),
      deliveryAddress: Joi.string().required(),
      deliveryNumber: Joi.string().required(),
    }).validate({ totalPrice, deliveryAddress, deliveryNumber });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    next();
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro', error: e.message });
  }
};
