const router = require('express').Router();
const { getAllProducts, getProductsById } = require('../controller');

router.get('/', getAllProducts);
router.get('/:id', getProductsById);

module.exports = router;
