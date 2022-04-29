const Users = (sequelize, DataTypes) => {
  const User = sequelize.define('users', 
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
  {
    timestamps: false,
    underscored: true,
  });
  return User;
};

module.exports = Users;
