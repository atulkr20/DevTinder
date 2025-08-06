const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

requestRouter.post("/request/send/:status/:toUserId", 
  userAuth, 
  async (req, res) => {
  try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignoreed", "interested"];
    if(!allowedStatus.includes(status)) {
      return res
      .status(400)
      .json({message: "Invalid status type: " + status});
    }

    // Check if there is existing connectionRequest

    const existingConnectionRequest = await ConnectionRequest.findOne ({
      $or: [
        {fromUserId, toUserId},
        {fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if(existingConnectionRequest){
      return res
      .status(400)
      .send({message: "Connection Request Already Exists!!"});
    }

    const connnectionRequest = new ConnectionRequest ({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connnectionRequest.save();

    res.json({
      messsge:"Connection request sent successfully!",
      data,
    });

  }
  catch(err) {
    res.status(400).send("EROR: " + err.message);
  }
})

  


module.exports = requestRouter;