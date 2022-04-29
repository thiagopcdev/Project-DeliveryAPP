const { StatusCodes } = require('http-status-codes');
const { users } = require('../../database/models');

module.exports = async (req, res, _next) => {
  try {
    const { role } = req.query;
    const usersOfRole = await users.findAll({ attributes: {
      exclude: ['password'],
    },
    where: { role },
   });

    if (!usersOfRole) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'not found' });
    return res.status(StatusCodes.OK).json(usersOfRole);
  } catch (e) {
    return console.error(e.message);
  }
};
