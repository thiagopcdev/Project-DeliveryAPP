const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');

const signUp = (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const { error } = Joi.object({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      }).validate({ email, password, name });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }
    next();
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
  }
};

const signIn = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).validate({ email, password });

    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: error.details[0].message });
    }

    return next();
  } catch (e) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'Erro ao consultar dados de usuário no banco', error: e.message });
  }
};

module.exports = {
  signIn,
  signUp,
};
