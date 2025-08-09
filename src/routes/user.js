const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest")

// Get all the pending connection request for the loggedIn User

userRouter.get("/user/requests", userAuth, async (req, res) => {

    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        }).populate("fromUserId", 
            "firstName lastName phtourl age gender about skills"
        );
  

    
    } catch (err) {
        req.statusCode(400).send("ERROR: " + err.message);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
   try{
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        $or: [
            {toUserId: loggedInUser._id, status: "accepted"},
            {fromUserId: loggedInUser._id, status: "accepted"},

        ],
    }).populate("fromUserId", USER_SAFE_DATA);
    const data = connectionRequests.map((row) => row.fromUserId);
    res.json({data});

} catch (err) {
    res.status(400).send({message: err.message});
   }


});




module.exports = userRouter;