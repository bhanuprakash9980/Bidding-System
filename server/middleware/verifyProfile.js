const db = require('../models');
const UserProfile = db.user_profile;

const vp = (req, res, next) => {
  {
    UserProfile.findOne({
      where: {
        userId: req.body.userId || req.params.id,
      },
    })
      .then((profile) => {
        if (profile) {
          next();
          return;
        } else {
          console.log('Error');
          res.status(403).send({ message: 'Create a Profile First' });
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(403).send({ message: err.message });
        return;
      });
  }
};
module.exports = vp;
