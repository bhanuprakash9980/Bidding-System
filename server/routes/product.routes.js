const controller = require('../controllers/product.controller');
const { authJwt, verifyProfile } = require('../middleware');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/product/getAllProducts', controller.getAllProducts);

  app.post(
    '/api/product',
    [authJwt.verifyToken, authJwt.isProducer, verifyProfile],
    controller.createProduct
  );
  app.get(
    '/api/productsByProducer/:id',
    [authJwt.verifyToken, authJwt.isProducer, verifyProfile],
    controller.getProductsByProducer
  );
  app.get(
    '/api/ActiveproductsByProducer/:id',
    [authJwt.verifyToken, authJwt.isProducer, verifyProfile],
    controller.getActiveProductsByProducer
  );
  app.get(
    '/api/CompleteproductsByProducer/:id',
    [authJwt.verifyToken, authJwt.isProducer, verifyProfile],
    controller.getCompleteProductsByProducer
  );
  app.get(
    '/api/productById/:id/:pid/',
    [authJwt.verifyToken, verifyProfile],
    controller.getProductById
  );
  app.get(
    '/api/getProductById/:pid',
    [authJwt.verifyToken],
    controller.getProductByIdOne
  );
  // app.get(
  //   '/api/getProducer/:pid',
  //   [authJwt.verifyToken],
  //   controller.getProducer
  // );
  app.get(
    '/api/completedOrders/:id',
    [authJwt.verifyToken, verifyProfile],
    controller.completedOrders
  );
  app.get(
    '/api/finaliseBid/:pid',
    [authJwt.verifyToken],
    controller.finaliseBid
  );
  app.get('/api/reBid/:pid', [authJwt.verifyToken], controller.reBid);
  app.get('/api/basePrice/:id', controller.basePrice);
};
