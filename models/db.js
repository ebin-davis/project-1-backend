const mongoose = require("mongoose");

const localDB = `mongodb://127.0.0.1:27017/project-1`;
const connectDB = async () => {
  try {
    await mongoose.connect(localDB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Connection error" + error);
  }
};
module.exports = connectDB;
