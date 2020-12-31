const { verifySignUp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post(
    '/api/auth/signup',
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post('/api/auth/signin', controller.signin);
  app.get('/api/auth/getUser', [authJwt.verifyToken], controller.getUser);
  app.get(
    '/api/auth/getUserById/:id',
    [authJwt.verifyToken],
    controller.getUserById
  );
};
