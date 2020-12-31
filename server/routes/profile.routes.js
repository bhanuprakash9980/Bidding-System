const controller = require('../controllers/profile.controller');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.post('/api/all/profile', controller.postProfile);
  app.get('/api/all/profile/:id', controller.getProfile);
  app.put('/api/all/profile/:id', controller.updateProfile);
};
