const mongoose = require("mongoose");

const INITIALIZE_DB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect) {
      console.log("Connected successfully.");
    }
  } catch (error) {
    console.log("Connection Failed:", error);
  }
};

module.exports = { INITIALIZE_DB };
