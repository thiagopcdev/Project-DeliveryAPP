const { StatusCodes } = require('http-status-codes');
const md5 = require('md5');
const { users } = require('../../database/models');

const adminCreateUser = async (userInfo, reqId) => {
  const { name, email, password } = userInfo;

  const currentUser = await users.findByPk(reqId);
  if (currentUser.role !== 'administrator') {
    return { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'Error: Only the administrator can make this request', 
    };
  }
  const emailExists = await users.findOne({ where: { email } });
  const nameExists = await users.findOne({ where: { name } });

  if (emailExists || nameExists) {
    return { status: StatusCodes.CONFLICT, message: 'user registered' }; 
  }
  const newUser = await users.create({ ...userInfo, password: md5(password) });
  if (!newUser) return { status: 500, message: 'Error: Problem with create user model func' };

  return { status: StatusCodes.CREATED, newUser };
};

module.exports = adminCreateUser;
