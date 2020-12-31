module.exports = (sequelize, Sequelize) => {
  const Profile = sequelize.define('profiles', {
    contact_number: {
      type: Sequelize.BIGINT,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    pic: {
      type: Sequelize.STRING,
      default:
        'https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png',
    },
  });

  return Profile;
};
