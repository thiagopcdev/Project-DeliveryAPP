const md5 = require('md5');
const { users } = require('../../database/models');
const { jwtActions } = require('../../helpers');

const createUser = async (userInfo) => {
  const { name, email, password } = userInfo;
  const emailExists = await users.findOne({ where: { email } });
  const nameExists = await users.findOne({ where: { name } });

  if (emailExists || nameExists) return { message: 'user registered' };

  const newUser = await users.create({ ...userInfo, password: md5(password) });
  const token = await jwtActions.generateToken(newUser);
  const { dataValues: { password: pass, ...remnant } } = newUser;
  return { token, remnant };
};

const findUser = async (email) => {
  const user = await users.findOne({ where: { email } });
  return user;
};

module.exports = {
  createUser,
  findUser,
};
