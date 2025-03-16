const express = require("express");
const { userAuth } = require("../middlewares/auth");
const razorinstance = require("../utils/razorpay");
const paymentrouter = express.Router();
const Payments = require("../models/Payments");
const User=require("../models/user");
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

paymentrouter.post("/payment/webhook", async (req, res) => {
  try {
    
    const webhookSignature=req.get("X-Razorpay-Signature");
    console.log("Webhook signature",webhookSignature)

   const isWebhookValid= validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEB_HOOK_SECRET
    );

    if(!isWebhookValid){
      console.log("Invalid Webhook")
      return res.status(400).json({msg:"Enter valid Webhook"})
    }


    //update the payment Status in Db

    const paymentDetails=req.body.payload.payment.entity;

    const payment=await Payments.findOne({orderId : paymentDetails.order_id})
    payment.status=paymentDetails.status;

    await payment.save();

    const user=await User.findOne({_id:payment.userId});
    user.isPremium=true;
    user.membershipType=payment.notes.membershipType;
    await user.save();


    //update the user as the premium user


    // if(req.body.even === "payment.captured"){

    // }

    // if(req.body.event === "payment.failed"){

    // }


    return res.status(200).json({msg:"Webhook recieved Successfully"})

  } 
  catch (err) {

    return res.status(500).json({msg: err.message})
  }
});

module.exports = paymentrouter;
