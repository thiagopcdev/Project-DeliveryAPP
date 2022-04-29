const md5 = require('md5');
const { users } = require('../../database/models');
const { jwtActions } = require('../../helpers');

module.exports = async (email, password) => {
  const user = await users.findOne({ where: { email } });

  if (!user) return false;

  if (user.password !== md5(password)) return false;

  const { dataValues: { password: pass, ...remnant } } = user;

  const token = await jwtActions.generateToken(user);
  return { token, remnant };
};
