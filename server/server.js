const express = require('express');

const app = express();
require('dotenv').config();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
const mongoDb = require('./config/mongo.config');
const Role = db.role;

// development;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// production
db.sequelize.sync();

mongoDb().then(() => {});

// simple route

const initial = () => {
  Role.create({
    id: 1,
    name: 'consumer',
  });

  Role.create({
    id: 2,
    name: 'producer',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
};

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/profile.routes')(app);
require('./routes/product.routes')(app);
require('./routes/bidding.routes')(app);
require('./routes/feedback.routes')(app);

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'client', 'build', 'index.html');
  });
}
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
