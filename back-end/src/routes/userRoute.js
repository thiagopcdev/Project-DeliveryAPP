const router = require('express').Router();
const { 
  createNewUser, 
  getUser, 
  findAllUsers,
  adminCreateNewUser, 
  deleteUser,
  getUsersByRole } = require('../controller');
const { userValidations, auth } = require('../middlewares');

router.delete('/admin', auth, deleteUser);
router.post('/admin', userValidations.signUp, auth, adminCreateNewUser);
router.post('/', userValidations.signUp, createNewUser);
router.get('/', findAllUsers);
router.get('/:id', getUser);
router.get('/', getUsersByRole);

module.exports = router;
