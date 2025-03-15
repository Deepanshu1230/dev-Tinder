const express = require("express");
const { userAuth } = require("../middlewares/auth");

const validator = require("validator");

const {
  ValidateProfileEdit,
  ValidateProfilePassword,
} = require("../utils/validator");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.UserInfo;

    // const decodedValue=await jwt.verify(token,"DevTinder@123");

    // console.log(decodedValue);

    // const {_id}=decodedValue;

    // console.log("LoggedIn User Info:"+_id);

    // const ProfileUser=await User.findById(_id);

    // if(!ProfileUser){
    //     throw new Error("User Doesnot Exist");
    // }

    res.send(user);
  } catch (err) {
    res.status(400).send("Error handling :" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    ValidateProfileEdit(req);

    const loggedIndata = req.UserInfo;

    const updateData = req.body;

    Object.keys(updateData).forEach((k) => (loggedIndata[k] = updateData[k]));

    await loggedIndata.save();

    res.json({
      message: `${loggedIndata.firstName}, Profile is Updated Succesfully`,
      data: loggedIndata,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const IsAllowed = ["password"];
    const ChangingPassword = req.body;

    const IsValid = Object.keys(ChangingPassword).every((k) =>
      IsAllowed.includes(k)
    );

    if (!IsValid) {
      throw new Error("Enter the valid details");
    }

    const userPassword = req.UserInfo;

    const { password } = ChangingPassword;
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Enter a strong password" });
    }

    Object.keys(ChangingPassword).forEach(
      (k) => (userPassword[k] = ChangingPassword[k])
    );

    const Hashpassword = await bcrypt.hash(password, 10);
    userPassword.password = Hashpassword;

    await userPassword.save();

    res.send("Password Changed");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
