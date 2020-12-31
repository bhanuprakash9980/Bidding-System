module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('products', {
    product_name: {
      type: Sequelize.STRING,
    },
    product_desc: {
      type: Sequelize.STRING,
    },
    base_price: {
      type: Sequelize.INTEGER,
    },
    final_price: {
      type: Sequelize.INTEGER,
    },
    purchased_at: {
      type: Sequelize.DATE,
    },
    bid_due: {
      type: Sequelize.DATE,
    },
    is_sold: {
      type: Sequelize.BOOLEAN,
    },
    producer: {
      type: Sequelize.STRING,
    },
    lastBidder: {
      type: Sequelize.STRING,
    },
  });

  return Product;
};
