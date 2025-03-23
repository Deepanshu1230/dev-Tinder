const socket = require("socket.io");
const crypto = require("crypto");
const { Chat } = require("../models/chat");
const connectionRequest=require("../models/ConnectionRequest");

const initailiseSocket = (server) => {
  const SecretRoomId = (firstName, userId, targetUser) => {
    return crypto
      .createHash("sha256")
      .update([userId, targetUser].sort().join("_"))
      .digest("hex");
  };

  const io = socket(server, {
    cors: {
      origin: process.env.FRONT_URL,
    },
  });

  //Accepts the Connection
  io.on("connection", (socket) => {
    //Handle all request

    
    socket.on("joinchat", ({ firstName, userId, targetUser }) => {
      const room = SecretRoomId(firstName, userId, targetUser);
      // console.log(firstName + " Joining the room: " + room);

      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName,lastName,photoUrl, userId, targetUser, text }) => {
        try {
          const room = SecretRoomId(firstName, userId, targetUser);
          // console.log(firstName + " " + text);

          //Now we have to save the chat in the using the monogodb
          //Intially we need to check wther the connection exist or not
         //Putted some sort of authentication for the user
        await connectionRequest.findOne({
          $or:[
            {fromUserId:userId,
              ToUserId:targetUser,
              status:"accepted",

            },

            {
              fromUserId:targetUser,
              ToUserId:userId,
              status:"accepted",

            }
          ]
        })


          //If chat already exist so do this
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUser] },
          });

          //If New Chat is There\
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUser],

              messages: [],
            });
          }

          chat.messages.push({
            SenderId: userId,
            text,
          });

          await chat.save();

          io.to(room).emit("messageRecieved", { firstName,lastName,photoUrl, text });
        } catch (err) {
          console.log(err.message);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = { initailiseSocket };
