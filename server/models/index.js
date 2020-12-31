const config = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../models/user.model.js')(sequelize, Sequelize);
db.role = require('../models/role.model.js')(sequelize, Sequelize);
db.profile = require('./profile.model.js')(sequelize, Sequelize);
db.product = require('./product.model.js')(sequelize, Sequelize);
db.feedback = require('./feedback.model.js')(sequelize, Sequelize);
db.user_role = require('./user_role.model.js')(sequelize, Sequelize);
db.user_profile = require('./user_profile.model.js')(sequelize, Sequelize);
db.producer = require('./producer.model.js')(sequelize, Sequelize);
db.bidder = require('./bidder.model.js')(sequelize, Sequelize);
db.feedback_giver = require('./feedback_giver.model.js')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: db.user_role,
  foreignKey: 'roleId',
  otherKey: 'userId',
});
db.user.belongsToMany(db.role, {
  through: db.user_role,
  foreignKey: 'userId',
  otherKey: 'roleId',
});

db.profile.belongsToMany(db.user, {
  through: db.user_profile,
  foreignKey: 'profileId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.profile, {
  through: db.user_profile,
  foreignKey: 'userId',
  otherKey: 'profileId',
});
db.product.belongsToMany(db.user, {
  through: db.producer,
  foreignKey: 'productId',
  otherKey: 'userId',
});

db.user.belongsToMany(db.product, {
  through: db.producer,
  foreignKey: 'userId',
  otherKey: 'productId',
});

db.user.belongsToMany(db.feedback, {
  through: db.feedback_giver,
  foreignKey: 'userId',
  otherKey: 'feedbackId',
});
db.feedback.belongsToMany(db.user, {
  through: db.feedback_giver,
  foreignKey: 'feedbackId',
  otherKey: 'userId',
});

db.ROLES = ['consumer', 'admin', 'producer'];

module.exports = db;
