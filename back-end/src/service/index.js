const { createUser, findUser } = require('./user/create');
const userSignIn = require('./user/login');
const createSale = require('./sales/createSale');
const createSaleProduct = require('./orders/create');
const findAllUsers = require('./user/findAll');
const deleteUser = require('./user/delete');
const adminCreateUser = require('./user/createAdmin');

module.exports = {
  createUser,
  userSignIn,
  createSale,
  createSaleProduct,
  findUser,
  findAllUsers,
  deleteUser,
  adminCreateUser,
};
