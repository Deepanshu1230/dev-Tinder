import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/RequestSlice";
import { ToastContainer } from "react-toastify";
import ColourfulText from "./ui/colourful-text";
import image from "../images/wmremove-transformed.png";

const Request = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.Request);

  const Reviewrequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(res?.data?.data));
      // console.log(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!request)
    return (
      <div>
        <div>404</div>
      </div>
    );

  if (request.length === 0)
    return (
      <div className="mt-24 mb-24 w-full">
        <div>
          <img
            src={image}
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
          />
        </div>
        <div>
          <p className="text-3xl font-bold">No Request Found</p>
        </div>
      </div>
    );

  return (
    <div>
      <div className="mt-32 mb-64 px-4 max-w-4xl mx-auto">
        <ToastContainer />
        <div className="text-5xl px-5 font-extrabold text-center mb-6 text-white drop-shadow-xl">
          <ColourfulText text={"Request"} />
        </div>
        <div className="flex flex-col gap-6">
          {request.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className="flex flex-col md:flex-row justify-evenly items-center bg-black gap-x-4 mt-6 rounded-xl p-3 border border-white"
              >
                <div className="border-2 border-purple-400 rounded-full overflow-hidden w-[80px] h-[80px]">
                  <img
                    src={photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start text-center">
                  <p className="font-bold text-lg w-full md:text-start">
                    {firstName + " " + lastName}
                  </p>
                  <p className="font-semibold text-gray-400 w-full md:text-start">{age}</p>
                  <p className="text-gray-300">{about}</p>
                </div>

                <div className="flex flex-row md:flex-col mt-4 gap-x-3 md:gap-4 ">
                  <button
                    className="bg-pink-500 px-4 py-2 rounded-xl"
                    onClick={() => Reviewrequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-blue-500 px-4 py-2 rounded-xl"
                    onClick={() => Reviewrequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Request;
