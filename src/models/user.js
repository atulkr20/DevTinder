const mongoose= require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema ({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate (value){
            if(!validator.isEmail(value)){
            throw new Error ("Email is not valid" + value);
        }
        }
       
    },
    password: {
        type: String,
        required: true,
        validate (value){
            if(!validator.isStrongPassword(value)){
            throw new Error ("Password is not strong" + value);
        }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate:(value) =>{
            if(!["male", "female", "other"].includes(value)){
                throw new Error ("Gender data is not valid")
            }
        }

    },
    photoUrl: {
        type: String,
        default: "https://svgsilh.com/image/659651.html",
        validate (value){
            if(!validator.isURL(value)){
            throw new Error ("Photo Url is not valid" + value);
        }
        }
    },
    about: {
        type: String,
        default: "This is the default description of the user!",
    },
    skills: {
        type: [String]
    },
    createdAt:{
        type: Date,
    }
},
 {
    timestamps: true,
});


userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await JsonWebTokenError.sign ({ _id: user._id}, "DEV@Tinder$790", {
        expiresIn: "7d",
    });

    return token;
}; 

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser, 
    passwordHash);
    return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema)

 