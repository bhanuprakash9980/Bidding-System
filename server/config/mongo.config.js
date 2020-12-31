const mongoose = require('mongoose');
const db = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    if (connection) console.log('MongoDb connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = db;
