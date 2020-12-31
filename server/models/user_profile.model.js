module.exports = (sequelize, Sequelize) => {
  const UserProfile = sequelize.define('user_profiles', {});

  return UserProfile;
};
