const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth")
const app = express();


app.use(cookieParser());
app.use(express.json()); // Used for handle JSON data
app.use(express.urlencoded({ extended: true })); // Used for handle Form data

// Creating a signup API
app.post("/signup", async (req, res) => {

  try {
  validateSignUpData(req);

  const {firstName, lastName, emailId, password} = req.body;

  //Encrypt the password
  const passwordHash =  await bcrypt.hash(password, 10);
  console.log(passwordHash);


// Creating a new instance of the user model
  const user = new User({
     firstName,
     lastName,
     emailId,
     password: passwordHash,
  });

  
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});

// Creating Login API
  
app.post("/login", async (req, res) => {
  try {
   const {emailId, password} = req.body;

   const user = await User.findOne({emailId: emailId});
   if(!user) {
    throw new Error("Invalid Credentials");

   }
   const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if(isPasswordValid) {
  // Create a JWT Token

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$790", {expiresIn: "7d"});
  console.log(token);
   
  // Add the token to cookie and send the response back to user

  res.cookie("token", token);

    res.send("Login Successfully")
  }
  else {
    throw new Error("Invalid Credentials" )
  }
  }
  catch(err) {
    res.status(400).send("ERROR : " + err.message)
  }
});


app.get("/profile", userAuth, async (req, res) => {
  try {

  const user = req.user;
  if(!user) {
    throw new Error("User does not exist");
  }

  res.send(user);
  } 
  catch(err) {
    res.status(400).send("ERROR :" + err.message);
  }

});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Sending the connection request");

  res.send(user.firstName + " " + "Connection request sent")


});

// Finding user by Email Id
app.get("/user", async (req, res) => {
  const userEmail = req.query.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(400).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something Went Wrong");
  }
});

// Creating a feed Api

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong here again");
  }
});

// Creating delete Api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Creating Update API

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("User update failed" + " " + err.message);
  }
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
