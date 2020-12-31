const db = require('../models');
const Product = db.product;
const Bidder = db.bidder;

const vp = (req, res, next) => {
  {
    try {
      Bidder.findOne({
        where: {
          userId: req.params.id,
          productId: req.params.productId,
        },
      }).then(async (bidder) => {
        const product = await Product.findByPk(req.params.productId);
        if (bidder && product.is_sold) {
          next();
          return;
        } else {
          res
            .status(500)
            .send({ message: 'Product is not Finalised after bidding' });
          return;
        }
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
      return;
    }
  }
};
module.exports = vp;
