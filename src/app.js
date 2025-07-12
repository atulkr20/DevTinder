const express = require('express');
const connectDB = require('./config/database'); 
const User = require("./models/user");
const app = express();

app.use(express.json())
// Creating a signup API
app.post("/signup", async (req, res) => {
    const user = new User(req.body);
        
    try{
    await user.save();
    res.send("User Added Successfully")
    } catch (err){
        res.status(400).send("Error saving the user" + err.message)
    }

});

// Finding user by Email Id
app.get("/user", async (req, res) => {
 const userEmail = req.query.emailId;
try 
{
  const users = await User.find({emailId: userEmail})
  if(users.length === 0){
    res.status(400).send("User not found")
  }
  else{
    res.send(users);
  }
}
catch(err){
  res.status(400).send("Something Went Wrong")
}
});

// Creating a feed Api

app.get("/feed", async (req, res) =>{
  try {
  const users = await User.find({});
  res.send(users);
  }

  catch(err){
    res.status(400).send("Something went wrong here again")
  }
});

// Creating delete Api
app.delete("/user", async (req, res) => {
  const userId = req.body.userId

  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully")
  } catch(err){
    res.status(400).send("Something went wrong")
  }
});

// Creating Update API

app.patch("/user", async (req, res) => {
  const userId = req.body.userId
  const data = req.body;

  try{
    const ALLOWED_UPDATES = ["photourl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if(data?.skills.length > 10){
      throw new Error("Skills cannot be more than 10");
    }
    await User.findByIdAndUpdate({_id: userId}, data,
    {runValidators: true,});
    res.send("User updated successfully")
  } catch(err){
    res.status(400).send("User update failed" + " " +  err.message)
  }
})
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
