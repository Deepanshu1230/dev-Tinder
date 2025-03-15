const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorinstance = require("../utils/razorpay");
const paymentrouter = express.Router();
const Payments = require("../models/Payments");
const { membershipAmount } = require("../utils/constant");

paymentrouter.post("/payment/create", userAuth, async (req, res) => {
  try {
  
    const user = req.UserInfo;
    const { membershipType } = req.body;
    if (!membershipType || !membershipAmount[membershipType]) {
        return res.status(400).json({ message: "Invalid membership type." });
      }


    const order = await razorinstance.orders.create({
      amount: membershipAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName:user.firstName,
        lastName:user.lastName,
        emailId:user.emailId,
        membershipType: membershipType,
      },

    });

    //save the order
    // console.log(order);

    const payments = new Payments({
      userId: user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    // console.log(payments);

    const savepayment = await payments.save();

    //send it back to the frontend code
    res.json({ ...savepayment.toJSON(), keyId: process.env.KEY_ID});
  } catch (err) {
    res.status(500).json({ message: err });
    console.log(err);
  }
});

module.exports = paymentrouter;
