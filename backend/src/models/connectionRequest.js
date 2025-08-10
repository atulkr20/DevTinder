const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the user connection
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        enum :{
            values:["ignore", "interested", "accepted", "rejected"],
            message: '{value} is incorrect'
        },
    },
},
{timestamps: true}
);
connectionRequestSchema.index ({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;

    // Check if the fromUserId is same  as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself!");

    }
    next();
});

const connectRequest = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports = connectRequest;