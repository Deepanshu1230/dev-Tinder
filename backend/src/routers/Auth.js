const express = require("express");
const { ValidatorSignup } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  //This is the instance of the user model

  try {
    // if(UserInfo?.skills.length >5){
    //     throw new Error("Skills Size Exceeded");

    // }

    //validation of Data
    ValidatorSignup(req);

    const {
      firstName,
      lastName,
      emailId,
      password,
      skills,
      age,
      about,
      photoUrl,
    } = req.body;
    //Encrypting the Password
    const passwordhash = await bcrypt.hash(password, 10);
    // console.log(passwordhash);

    const UserInfo = new User({
      firstName,
      lastName,
      emailId,
      password: passwordhash,
      skills,
      age,
      about,
      photoUrl
    });
    const savedUser=await UserInfo.save();
    const token = await savedUser.getJWT();
    // console.log(token);

    //Add the Token to the Cookie and sent back to user
    res.cookie("token", token,{
      expires:new Date(Date.now() + 8*360000),
    });

    res.json({message:"User Succesfully Sent the data",data:savedUser});

  } catch (err) {
    // if (err.code === 11000) {
    //     return res.status(400).json({ error: "Email already exists" });
    // }
    res.status(400).send("Error handling :" + err.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // if(!validator.isEmail(emailId)){
    //     throw new Error("Enter valid emailId");

    // }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const IsvalidPassword = await user.ValidatePassword(password);

    if (IsvalidPassword) {
      //Create JWT Token
      const token = await user.getJWT();
      // console.log(token);

      //Add the Token to the Cookie and sent back to user
      res.cookie("token", token);

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error handling :" + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });

  res.send("Logout Successfully");
});

module.exports = authRouter;
