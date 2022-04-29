const { users } = require('../../database/models');

const findAllUsers = async () => {
  const usersList = await users.findAll();
  return usersList;
};

module.exports = findAllUsers;
