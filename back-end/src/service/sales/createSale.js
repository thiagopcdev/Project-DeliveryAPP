const { sales } = require('../../database/models');
const { jwtActions } = require('../../helpers');

module.exports = async (saleInfo, token) => {
  const data = await jwtActions.checkToken(token);
  if (!data) return false;
  const userId = data.id;
  const saleDate = new Date();
  return sales.create({ ...saleInfo, status: 'Pendente', userId, saleDate });
};