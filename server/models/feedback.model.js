module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define('feedbacks', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    feedback_content: {
      type: Sequelize.STRING,
    },
  });

  return Feedback;
};
