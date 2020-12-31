module.exports = (sequelize, Sequelize) => {
  const Bidder = sequelize.define('bidders', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: { type: Sequelize.INTEGER },
    userId: { type: Sequelize.INTEGER },
    productId: { type: Sequelize.INTEGER },
  });

  return Bidder;
};
