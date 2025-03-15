import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profileview from "./Profileview";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addUser } from "../utils/userSlice"; // Ensure addUser is imported

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const saveProfile = async () => {
    //clearing all error
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      toast.success("Profile Updated", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (err) {
      setError(err.response.data);
      toast.error("Failed to update profile", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      {/* Render ToastContainer at the top with a high z-index */}
      <ToastContainer style={{ zIndex: 9999 }} />
      <div className="md:flex">
        {/* Edit Profile */}
        <div className="flex items-center justify-center md:min-h-screen p-4 mt-20 mb-7">
          <div className="bg-black/40 backdrop-blur-lg border border-gray-700 shadow-xl rounded-xl p-8 w-96">
            <h2 className="text-3xl font-extrabold text-white text-center mb-6">
              Edit Profile
            </h2>

            {/* FirstName Input */}
            <div className="mb-5">
              <label className="block text-gray-300 font-medium mb-2 text-left">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* LastName Input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2 text-start">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Photo URL Input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2 text-start">
                Photo URL
              </label>
              <input
                type="text"
                placeholder="Enter URL"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Age Input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2 text-start">
                Age
              </label>
              <input
                type="number"
                placeholder="Enter your Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Gender Input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2 text-start">
                Gender
              </label>
              <input
                type="text"
                placeholder="Enter your Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* About Input */}
            <div className="mb-6">
              <label className="block text-gray-300 font-medium mb-2 text-start">
                About
              </label>
              <input
                type="text"
                placeholder="Enter About Yourself"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Error Message */}
            <p className="text-red-600">{error}</p>
            {/* Save Button */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>

        {/* Profile view */}
        <div>
          <Profileview
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
    </>
  );
};

export default Editprofile;
