const { StatusCodes } = require('http-status-codes');
const { users } = require('../../database/models');

const deleteUser = async (id, reqId) => {
  const currentUser = await users.findByPk(reqId);
  if (currentUser.role !== 'administrator') {
    return { 
      status: StatusCodes.UNAUTHORIZED, 
      message: 'Error: Only the administrator can make this request', 
    };
  }
  const delUser = await users.destroy({ where: { id } });
  if (!delUser) {
    return { 
      status: StatusCodes.INTERNAL_SERVER_ERROR, 
      message: 'Post has not been deleted', 
    };
 }
 return { status: StatusCodes.NO_CONTENT };
};

module.exports = deleteUser;
