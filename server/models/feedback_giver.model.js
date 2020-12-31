module.exports = (sequelize, Sequelize) => {
  const FeedbackGiver = sequelize.define('feedback_givers', {});

  return FeedbackGiver;
};
