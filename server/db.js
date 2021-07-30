const mongoose = require("mongoose");
const config =require('./confing')
const connectDB = async () => {
  try {
    await mongoose.connect(config.DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;