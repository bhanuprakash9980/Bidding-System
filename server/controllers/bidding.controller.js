const db = require('../models');
const User = db.user;
const Bidder = db.bidder;
const Product = db.product;
const Producer = db.producer;

exports.increaseBid = async (req, res) => {
  const consumerId = req.params.id;
  const pid = req.params.pid;
  try {
    const consumer = await User.findByPk(consumerId);
    if (!consumer) return res.status(404).send({ message: 'User Not found.' });
    const product = await Product.findByPk(pid);
    const producer = await Producer.findOne({
      where: {
        productId: pid,
      },
    });
    if (producer.userId == consumerId)
      return res
        .status(400)
        .send({ message: 'You cannot increase your own bid' });
    await Product.update(
      {
        final_price: product.final_price * 1.05,
        lastBidder: consumer.username,
      },
      {
        where: {
          id: pid,
        },
      }
    );
    await Bidder.create({
      userId: consumerId,
      productId: pid,
      amount: product.final_price * 1.05,
    });
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

// exports.completedOrders = async (req, res) => {
//   const consumerId = req.params.id;
//   try {
//     const consumer = await User.findByPk(consumerId);
//     if (!consumer) return res.status(404).send({ message: 'User Not found.' });
//     const orders = await Bidder.findAll({ where: { userId: consumerId } });
//     let products = [];
//     for (let i = 0; i < orders.length; i++) {
//       const completed = await Product.findOne({
//         where: {
//           id: orders[i].productId,
//           is_sold: true,
//         },
//       });
//       if (completed && products.indexOf(completed) == -1) {
//         products.push(completed);
//       }
//     }
//     if (!products) res.status(200).send([]);
//     else res.status(200).json(products);
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };

// exports.getLastBidder = async (req, res) => {
//   const productId = req.params.pid;
//   try {
//     const bidderO = await Bidder.findAll({
//       where: { productId: productId },
//       order: [['createdAt', 'DESC']],
//     });
//     if (bidderO.length > 0) {
//       const bidder = await User.findByPk(bidderO[0].userId);
//       res.status(200).json({ name: bidder.username });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(200).send({ name: 'No one Bidded yet' });
//   }
// };
