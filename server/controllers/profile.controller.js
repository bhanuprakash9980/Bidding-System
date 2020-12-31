const db = require('../models');
const User = db.user;
const Profile = db.profile;
const UserProfile = db.user_profile;

exports.updateProfile = (req, res) => {
  UserProfile.findOne({
    where: {
      userId: req.params.id,
    },
  })
    .then((profileUser) => {
      Profile.findByPk(profileUser.profileId)

        .then((profile) => {
          profile
            .update({
              contact_number: req.body.contact_number || profile.contact_number,
              full_name: req.body.full_name || profile.full_name,
              address: req.body.address || profile.address,
              pic: req.body.pic || profile.pic,
            })
            .then(() => {
              res.send({ message: 'profile updated successfully' });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getProfile = (req, res) => {
  UserProfile.findOne({
    where: {
      userId: req.params.id,
    },
  })
    .then((profileUser) => {
      Profile.findByPk(profileUser.profileId)

        .then((profile) => {
          res.status(200).json({
            contact_number: profile.contact_number,
            full_name: profile.full_name,
            address: profile.address,
            pic: profile.pic,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: 'create a Profile' });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: 'create a Profile' });
    });
};

exports.postProfile = (req, res) => {
  User.findByPk(req.body.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' });
      }
      Profile.create({
        contact_number: req.body.contact_number,
        full_name: req.body.full_name,
        address: req.body.address,
        pic: req.body.pic,
      })
        .then(async (profile) => {
          await UserProfile.create({
            userId: req.body.userId,
            profileId: profile.id,
          });
          res.status(200).json({ message: 'Success' });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
