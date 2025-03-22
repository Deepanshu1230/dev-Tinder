import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";
import connectImage from "../images/Animation - 1741340749020.gif";
import ColourfulText from "./ui/colourful-text";
import { Link } from "react-router";

const Connection = () => {
  const dispatch = useDispatch();
  const connection = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });

      // console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      toast.error("No connection Exist");
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connection)
    return <div className="text-center text-gray-400">No connection</div>;

  if (connection.length === 0)
    return (
      <div className="flex flex-col justify-center items-center mt-11 text-center">
        <img src={connectImage} className="w-60 h-60" />
        <p className="text-lg text-gray-400">Make Connection</p>
      </div>
    );

  return (
    <div className="mt-32 mb-64 px-4 max-w-4xl mx-auto">
      <ToastContainer />
      <div className="text-5xl px-5 font-extrabold text-center mb-6 text-white drop-shadow-xl">
        <ColourfulText text={"Connection"} />
      </div>
      <div className="grid grid-cols-1  gap-6">
        {connection.map(
          ({ _id , firstName, lastName, photoUrl, about, age, gender }) => (
            <div
              key={_id}
              className="flex flex-col md:flex-row bg-black gap-x-4 mt-6 rounded-xl p-3 border border-white items-center sm:items-start"
            >
              <div className="border-2 border-purple-400 rounded-full overflow-hidden w-[80px] h-[80px]">
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start text-center">
                <p className="font-bold text-lg">
                  {firstName + " " + lastName}
                </p>
                <p className="font-semibold text-gray-400">{age}</p>
                <p className="text-gray-300">{about}</p>
              </div>

              <Link to={"/chat/" + _id}>
                <button className="text-white font-bold bg-blue-400 rounded-lg px-4 py-2">Chat</button>
                </Link>
                
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Connection;
