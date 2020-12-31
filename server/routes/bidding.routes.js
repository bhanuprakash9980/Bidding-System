const controller = require('../controllers/bidding.controller');
const { authJwt, verifyProfile } = require('../middleware');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });
  app.get(
    '/api/increasebid/:id/:pid/',
    [authJwt.verifyToken, verifyProfile],
    controller.increaseBid
  );
  // app.get(
  //   '/api/completedOrders/:id',
  //   [authJwt.verifyToken, verifyProfile],
  //   controller.completedOrders
  // );
  // app.get(
  //   '/api/getLastBidder/:pid',
  //   [authJwt.verifyToken],
  //   controller.getLastBidder
  // );
};
