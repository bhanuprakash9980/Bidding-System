module.exports = (sequelize, Sequelize) => {
  const Producer = sequelize.define('producers', {});

  return Producer;
};
