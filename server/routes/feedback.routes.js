const controller = require('../controllers/feedback.controller');
const { authJwt, verifyProfile, verifyPurchase } = require('../middleware');

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.post(
    '/api/giveFeedback',
    [authJwt.verifyToken, verifyProfile],
    controller.giveFeedback
  );
  app.get(
    '/api/getFeedback/:id',
    [authJwt.verifyToken, authJwt.isAdmin, verifyProfile],
    controller.getFeedback
  );
  app.post(
    '/api/postReview/:id/:productId',
    [authJwt.verifyToken, verifyProfile, verifyPurchase],
    controller.postReview
  );
  app.get(
    '/api/getReview/:id',
    [authJwt.verifyToken, authJwt.isProducer],
    controller.getReview
  );
};
