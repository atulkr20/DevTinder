const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://atulkrjha59:Atul%40mongodb@namastenodejs.zedzwv2.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
