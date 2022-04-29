const { SalesProducts } = require('../../database/models');

module.exports = async (orderDetails, saleId) => {
  try {
    const saleProductCreation = await Promise.all(orderDetails.map(async (item) => {
      const [productId, quantity] = item;
      const saleProduct = await SalesProducts.create({ productId, quantity, saleId });
      
      if (!saleProduct) return false;
      return true;
  }));
  
  if (saleProductCreation.some((res) => !res)) return false;
  return true;
  } catch (e) {
    return console.error(e.message);
  }
};

/* order_details: [
  { product_id, quantity }
] */
