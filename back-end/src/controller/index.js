const { createNewUser, getUser, adminCreateNewUser } = require('./users/create');
const login = require('./users/login');
const { getAllProducts, getProductsById } = require('./products/getProducts');
const createNewSale = require('./sales/create');
const { getSaleById, getSales, getSalesCustomer } = require('./sales/getSales');
const createOrder = require('./orders/createOrder');
const { getAllOrders, getOrdersById } = require('./orders/getOrderDetails');
const getUsersByRole = require('./users/getUsers');
const findAllUsers = require('./users/findAll');
const deleteUser = require('./users/delete');
const updateSaleStatus = require('./orders/updateOrder');

module.exports = {
  createNewUser,
  getUser,
  login,
  getAllProducts,
  getProductsById,
  createNewSale,
  getSaleById,
  getSales,
  createOrder,
  getAllOrders,
  getOrdersById,
  getUsersByRole,
  getSalesCustomer,
  findAllUsers,
  adminCreateNewUser,
  deleteUser,
  updateSaleStatus,
};
