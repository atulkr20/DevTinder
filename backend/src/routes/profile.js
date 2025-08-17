const express = require("express");

const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation")


profileRouter.get("/profile/view", userAuth, async (req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    // update values
    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    // ✅ send updated user object back
    res.status(200).send({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

  

module.exports = profileRouter;