const { StatusCodes } = require('http-status-codes');
const { userSignIn } = require('../../service');

module.exports = async (req, res, _next) => {
  const { email, password } = req.body;

  const { token, remnant } = await userSignIn(email, password);

  if (!token) { 
    return res.status(StatusCodes.NOT_FOUND).json({ message: 'email ou senha inválidos' });
  }
  return res.status(StatusCodes.OK).json({ ...remnant, token });
};
