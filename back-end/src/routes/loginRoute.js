const router = require('express').Router();
const { userValidations } = require('../middlewares');
const { login } = require('../controller');

router.post('/', userValidations.signIn, login);

module.exports = router;
