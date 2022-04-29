const { StatusCodes } = require('http-status-codes');
const { findAllUsers } = require('../../service');

const findAll = async (_req, res) => {
  try {
    const usersList = await findAllUsers();
    return res.status(StatusCodes.OK).json(usersList);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

module.exports = findAll;
