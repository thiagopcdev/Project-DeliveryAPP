const router = require('express').Router();
const { saleValidation } = require('../middlewares');
const auth = require('../middlewares/auth');
const {
   createNewSale, 
   getSaleById,
    getSales, 
    getSalesCustomer, 
    updateSaleStatus, 
  } = require('../controller');

router.post('/', saleValidation, createNewSale);
router.get('/customer', auth, getSalesCustomer);
router.get('/', getSales);
router.get('/:id', getSaleById);
router.put('/:id', updateSaleStatus);

module.exports = router;
