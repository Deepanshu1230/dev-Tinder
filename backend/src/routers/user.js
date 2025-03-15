const express = require("express");

const UserRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");

const USER_SAFE = "firstName lastName age gender skills photoUrl about";
const User = require("../models/user");

UserRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const loggedIn = req.UserInfo;

    const connectionRequest = await ConnectionRequest.find({
      ToUserId: loggedIn._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName age gender skills photoUrl about"
    );
    // .populate("fromUserId",["firstName","lastName"]);

    if (!connectionRequest) {
      return res.status(400).json({
        message: `Unable to See Connectioi`,
      });
    }

    res.json({
      message: `Connection Are here`,
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});

UserRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedIn = req.UserInfo;

    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedIn._id, status: "accepted" },
        { ToUserId: loggedIn._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE)
      .populate("ToUserId", USER_SAFE);

    if (!connectionRequest) {
      return res.status(400).json({
        message: `No reply Found`,
      });
    }

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedIn._id.toString()) {
        return row.ToUserId;
      }
      return row.fromUserId;
    });

    res.json({
      message: `Connnection are Here`,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

UserRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //User Should see all the User cards except
    //0. His Own card
    //1. His Connection
    //2. Ignored people
    //3. already sent connection

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const loggedIn = req.UserInfo;

    const Connection = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedIn._id }, { ToUserId: loggedIn._id }],
    }).select("fromUserId ToUserId");

    const hideUserFromFeed = new Set();
    Connection.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.ToUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedIn._id } },
      ],
    })
      .select(USER_SAFE)
      .skip(skip)
      .limit(limit);

    // console.log(hideUserFromFeed);
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }

  const loggedIn = req.UserInfo;
});

module.exports = UserRouter;
