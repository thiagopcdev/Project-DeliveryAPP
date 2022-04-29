const { createSale } = require('../../service');

const createNewSale = async (SaleInfo) => {
  const { totalPrice, deliveryAddress, deliveryNumber, sellerId, authorization } = SaleInfo;

  try {
    const newSale = await createSale({
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      sellerId }, authorization);
      
    if (newSale) return newSale.id;
  } catch (e) {
    console.error(e.message);
  }
};

module.exports = createNewSale;