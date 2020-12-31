const db = require('../models');
const User = db.user;
const Feedback = db.feedback;
const Producer = db.producer;
const FeedbackGiver = db.feedback_giver;
const Review = require('../models/review.model');
const Product = db.product;

exports.postReview = async (req, res) => {
  const { id, productId } = req.params;
  const { reviewTitle, reviewDesc, rating } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(400).send({ message: 'User not Found' });
    const producer = await Producer.findOne({
      where: {
        productId: productId,
      },
    });
    if (!producer) res.status(500).send({ message: "Product doesn't exist" });
    const producerId = producer.userId;

    const review = new Review();

    review.producerId = producerId;
    review.consumerId = id;
    review.productId = productId;
    review.reviewTitle = reviewTitle;
    review.reviewDesc = reviewDesc;
    review.rating = rating;

    await review.save();

    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getReview = async (req, res) => {
  const id = req.params.id;
  try {
    let reviews = [];
    const review = await Review.find({ producerId: id });
    if (!review) res.status(200).send({ message: 'No reviews' });
    else {
      for (let i = 0; i < review.length; i++) {
        const user = await User.findByPk(review[i].consumerId);
        const product = await Product.findByPk(review[i].productId);
        if (user && product) {
          const userp = {
            username: user.username,
            product_name: product.product_name,
          };
          review[i] = {
            reviewTitle: review[i].reviewTitle,
            reviewDesc: review[i].reviewDesc,
            createdAt: review[i].createdAt,
            rating: review[i].rating,
          };

          reviews.push({ ...review[i], ...userp });
        }
      }

      res.status(200).send(reviews);
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getFeedback = async (req, res) => {
  const result = [];
  try {
    const feedback = await Feedback.findAll();
    for (let i = 0; i < feedback.length; i++) {
      const feedbackGiver = await FeedbackGiver.findAll({
        where: {
          feedbackId: feedback[i].id,
        },
      });
      for (let j = 0; j < feedbackGiver.length; j++) {
        const user = await User.findByPk(feedbackGiver[j].userId);

        const obj = {
          username: user.username,
          feedback_content: feedback[i].feedback_content,
        };
        if (result.indexOf(obj) == -1) result.push(obj);
      }
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.giveFeedback = async (req, res) => {
  const userId = req.body.userId;
  const feedback_content = req.body.feedback_content;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(400).send({ message: 'User not Found' });
    const feedback = await Feedback.create({
      feedback_content: feedback_content,
    });
    await FeedbackGiver.create({
      feedbackId: feedback.id,
      userId: userId,
    });
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
