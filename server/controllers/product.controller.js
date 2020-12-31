const db = require('../models');
const User = db.user;
const Product = db.product;
const Producer = db.producer;
const UserProfile = db.user_profile;
const ProductImage = require('../models/productImage.model');
const scrapper = require('../utils/productScraper');
const mailer = require('../utils/mailer');
const Profile = db.profile;
exports.getAllProducts = async (req, res) => {
  try {
    const product = [];
    const productList = await Product.findAll({
      where: {
        is_sold: false,
      },
    });
    for (let i = 0; i < productList.length; i++) {
      const images = await ProductImage.find({ productId: productList[i].id });
      const image = { images: images };
      if (productList[i])
        product.push({ ...productList[i].dataValues, ...image });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  User.findByPk(req.body.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      Product.create({
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        base_price: req.body.base_price,
        final_price: req.body.base_price,
        purchased_at: null,
        bid_due: req.body.bid_due,
        is_sold: false,
        producer: user.username,
        lastBidder: null,
      })
        .then((product) => {
          Producer.create({
            userId: user.id,
            productId: product.id,
          })
            .then(async () => {
              // res.send({ message: 'Product updated successfully.' });
              const productImage = new ProductImage();
              productImage.productId = product.id;
              productImage.images = req.body.url;
              await productImage.save();
            })
            .then(() => res.send({ message: 'Product updated successfully.' }));
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getProductsByProducer = (req, res) => {
  const uid = req.params.id;
  let data = [];
  User.findByPk(uid)
    .then((user) => {
      if (!user) res.status(404).send({ message: 'User not found' });
      Producer.findAll({
        where: {
          userId: uid,
        },
      })
        .then(async (users) => {
          for (var i = 0; i < users.length; i++) {
            const product = await Product.findOne({
              where: { id: users[i].productId },
            });
            data.push(product);
          }

          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
exports.getProductById = async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getProductByIdOne = async (req, res) => {
  const id = req.params.pid;
  try {
    const product = await Product.findByPk(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.getActiveProductsByProducer = async (req, res) => {
  const uid = req.params.id;
  let data = [];

  try {
    const user = await User.findByPk(uid);
    if (!user) res.status(404).send({ message: 'User not found' });
    const users = await Producer.findAll({
      where: {
        userId: uid,
      },
    });
    for (var i = 0; i < users.length; i++) {
      const productList = await Product.findOne({
        where: { id: users[i].productId, is_sold: false },
      });
      const images = await ProductImage.find({ productId: users[i].productId });
      const image = { images: images };
      let product = null;
      if (productList) product = { ...productList.dataValues, ...image };

      if (data.indexOf(product) == -1 && product) data.push(product);
    }

    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(200).send([]);
  }
};

exports.getCompleteProductsByProducer = async (req, res) => {
  const uid = req.params.id;
  let data = [];

  try {
    const user = await User.findByPk(uid);
    if (!user) res.status(404).send({ message: 'User not found' });
    const users = await Producer.findAll({
      where: {
        userId: uid,
      },
    });
    for (var i = 0; i < users.length; i++) {
      const productList = await Product.findOne({
        where: { id: users[i].productId, is_sold: true },
      });

      const images = await ProductImage.find({ productId: users[i].productId });
      const image = { images: images };
      let product = null;
      if (productList) product = { ...productList.dataValues, ...image };

      if (data.indexOf(product) == -1 && product) data.push(product);
    }
    // console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(200).send([]);
  }
};
// exports.getProducer = async (req, res) => {
//   try {
//     const productId = req.params.pid;
//     const producerO = await Producer.findOne({
//       where: {
//         productId: productId,
//       },
//     });
//     const producer = await User.findByPk(producerO.userId);
//     res.status(200).json(producer.username);
//   } catch (error) {
//     res.status(500).send({ message: err.message });
//   }
// };

exports.completedOrders = async (req, res) => {
  try {
    const consumerId = req.params.id;
    const user = await User.findByPk(consumerId);
    const product = [];
    const productList = await Product.findAll({
      where: { lastBidder: user.username, is_sold: true },
    });

    for (let i = 0; i < productList.length; i++) {
      const images = await ProductImage.find({ productId: productList[i].id });
      const image = { images: images };
      if (productList[i])
        product.push({ ...productList[i].dataValues, ...image });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.finaliseBid = async (req, res) => {
  try {
    const productId = req.params.pid;
    await Product.update(
      { is_sold: true, purchased_at: new Date() },
      {
        where: {
          id: productId,
        },
      }
    );
    const product = await Product.findByPk(productId);
    const producerName = product.producer;
    const lastBidderName = product.lastBidder;
    const consumer = await User.findOne({
      where: { username: lastBidderName },
    });
    const producer = await User.findOne({ where: { username: producerName } });
    const cP = await UserProfile.findOne({ where: { userId: consumer.id } });
    const consumerProfile = await Profile.findByPk(cP.profileId);
    const pP = await UserProfile.findOne({ where: { userId: producer.id } });
    const producerProfile = await Profile.findByPk(pP.profileId);
    const consumerHtml = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sharing Profile for further Transactions</title>
    
        <!--Import materialize.css-->
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css"
        />
      </head>
      <body>
        <div class="row">
          <div class="col s6 offset-s3">
            <h1 class="flow-text">Consumer Profile</h1>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <div class="align-center">
              <img
                src=${consumerProfile.pic}
                alt=""
                class="responsive-img"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">FullName: ${consumerProfile.full_name}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Email: ${consumer.email}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Contact Number: ${consumerProfile.contact_numer}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Address: ${consumerProfile.address}</p>
          </div>
        </div>
      </body>
    </html>
    `;

    const producerHtml = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Sharing Profile for further Transactions</title>
    
        <!--Import materialize.css-->
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.2/css/materialize.min.css"
        />
      </head>
      <body>
        <div class="row">
          <div class="col s6 offset-s3">
            <h1 class="flow-text">Producer Profile</h1>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <div class="align-center">
              <img
                src=${producerProfile.pic}
                alt=""
                class="responsive-img"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">FullName: ${producerProfile.full_name}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Email: ${producer.email}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Contact Number: ${producerProfile.contact_numer}</p>
          </div>
        </div>
        <div class="row">
          <div class="col s6 offset-s3">
            <p class="flow-text">Address: ${producerProfile.address}</p>
          </div>
        </div>
      </body>
    </html>
    `;

    await mailer(
      consumer.email,
      '',
      producerHtml,
      'Producer Profile From AgroBid'
    );
    await mailer(
      producer.email,
      '',
      consumerHtml,
      'Consumer Profile From AgroBid'
    );

    res.status(200).send({ message: 'Finalized and Sold' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.reBid = async (req, res) => {
  try {
    const productId = req.params.pid;
    await Product.update(
      {
        is_sold: false,
        purchased_at: null,
        bid_due: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
      },
      {
        where: {
          id: productId,
        },
      }
    );
    res.status(200).send({ message: 'Bid due is increased to 24 hrs' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.basePrice = async (req, res) => {
  try {
    const product = req.params.id;
    const price = await scrapper(`${product} 5kg`);

    res.status(200).send({ price: Math.round(price / 5) });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
