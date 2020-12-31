const authJwt = require('./authJwt');
const verifySignUp = require('./verifySignUp');
const verifyProfile = require('./verifyProfile');
const verifyPurchase = require('./verifyPurchase');

module.exports = {
  authJwt,
  verifySignUp,
  verifyProfile,
  verifyPurchase,
};
