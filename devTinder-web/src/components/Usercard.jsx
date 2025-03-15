"use client";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { removeFeed } from "../utils/Userfeed";
import { motion } from "framer-motion";

const Usercard = ({ user }) => {
  const { _id, firstName, lastName, about, age, gender, photoUrl } = user;

  const dispatch = useDispatch();

  const HandleFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeFeed(userId));
    } catch (err) {
      toast.error("Unable to Find feed");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center  bg-[#0d0d0d] items-center mt-40 mb-16 p-5 border border-gray-800 rounded-lg">
        <ToastContainer />
        <motion.div
          className="flex flex-col items-center bg-[#0d0d0d] border border-gray-800 p-6 rounded-2xl shadow-lg w-80 transition-transform"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={(event, info) => {
            if (info.offset.x > 100) {
              HandleFeed("interested", _id);
            } else if (info.offset.x < -100) {
              HandleFeed("ignored", _id);
            }
          }}
        >
          <img
            src={photoUrl}
            alt="User"
            className="w-full h-60 object-cover rounded-xl border border-gray-700"
          />
          <h3 className="text-xl font-semibold text-white mt-4">
            {firstName} {lastName}
          </h3>
          <p className="text-gray-400 text-sm mt-1 text-center px-4">{about}</p>
          <div className="flex gap-4 mt-5 w-full">
            <button
              onClick={() => HandleFeed("ignored", _id)}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all duration-300"
            >
              Reject
            </button>
            <button
              onClick={() => HandleFeed("interested", _id)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
            >
              Interested
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Usercard;
