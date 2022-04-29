const router = require('express').Router();
const { createOrder, getAllOrders, getOrdersById } = require('../controller');
const { saleValidation } = require('../middlewares');

router.post('/', saleValidation, createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrdersById);

module.exports = router;
