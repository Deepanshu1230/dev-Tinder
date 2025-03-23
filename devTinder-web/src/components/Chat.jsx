import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { FaPaperPlane } from "react-icons/fa";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUser } = useParams();
  const [message, Setmessage] = useState([]);
  const [newMessage, Setnewmessage] = useState("");
  const [target, Settarget] = useState("");
  const user = useSelector((store) => store.user);
  // console.log("Targetuser", targetUser?.data);
  const userId = user?._id;

  const fetchChat = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUser, {
      withCredentials: true,
    });
    // console.log("chat", chat?.data?.chat?.messages);
    // console.log("targetUser", chat?.data?.targetUser);

    const chatMessages = chat?.data?.chat?.messages.map((msg) => {
      return {
        firstName: msg?.SenderId?.firstName,
        lastName: msg?.SenderId?.lastName,
        photoUrl: msg?.SenderId?.photoUrl,
        text: msg?.text,
      };
    });

    Settarget(chat?.data?.targetUser);

    Setmessage(chatMessages);
  };

  useEffect(() => {
    fetchChat();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();

    //As soon the page loaded the socket get connected and join chat event is emiited

    socket.emit("joinchat", { firstName: user.firstName, userId, targetUser });

    socket.on("messageRecieved", ({ firstName, lastName, photoUrl, text }) => {
      Setmessage((message) => [
        ...message,
        { firstName, lastName, photoUrl, text },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUser]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      photoUrl: user.photoUrl,
      userId,
      targetUser,
      text: newMessage,
    });

    Setnewmessage("");
  };

  return (
    <div className="w-screen mt-16 h-screen flex justify-center items-center text-white">
      <div className="w-11/12 md:w-3/4 lg:w-1/2 h-4/5 flex flex-col border border-white rounded-lg bg-black bg-opacity-50 shadow-lg">
        {/* Chat Header */}
        <div className="border border-b-white">
          <div className="flex p-3 gap-x-2 items-center">
            <img
              src={target.photoUrl}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover"
              alt="User Profile"
            />
          

          
            <p className="text-xl font-Whitney font-bold">{target.firstName}</p>
            <p></p>
          </div>
        </div>

        {/* Chat Messages Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {message.map((msg, index) => {
            return (
              <>
                <div
                  className={
                    user.firstName === msg.firstName
                      ? "chat chat-end"
                      : "chat chat-start"
                  }
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src={msg.photoUrl}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {`${msg.firstName}` + " " + `${msg.lastName}`}
                    <time className="text-xs opacity-50"> 12:45</time>
                  </div>
                  <div className="chat-bubble rounded-xl">{msg.text}</div>
                  <div className="chat-footer opacity-50">Delivered</div>
                </div>
                {/* <div className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                  </div>
                  <div className="chat-bubble">I hate you!</div>
                  <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div> */}
              </>
            );
          })}
        </div>

        {/* Chat Input Section */}
        <div className="p-4 border-t border-gray-700 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => Setnewmessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white rounded-lg p-3 outline-none"
          />
          <button
            onClick={sendMessage}
            className="ml-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            <FaPaperPlane size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
