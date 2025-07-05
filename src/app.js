const express = require('express');
const connectDB = require('./config/database'); 
const User = require("./models/user");
const app = express();
// Creating a signup API
app.post("/signup", async (req, res) => {
    const user = new User ({
        firstName: "Atul",
        lastName: "Jha",
        emailId: "Atul@jha.com",
        password: "Atul@123"
    });
    await user.save();
    res.send("User Added Successfully")

});

connectDB()
  .then(() => {
    console.log("Database connection established....");

    app.listen(3000, () => {
      console.log("Server is successfully running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!", err);
  });
