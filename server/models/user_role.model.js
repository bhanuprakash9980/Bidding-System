module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define('user_roles', {});

  return UserRole;
};
