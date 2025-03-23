import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [firstName, Setfirstname] = useState("");
  const [lastName, Setlastname] = useState("");
  const [Isloginform, SetIslogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, Seterror] = useState("");

  async function handleLogin() {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      Seterror(err?.response?.data);
      console.log(err);
    }
  }

  const handleSignup = async () => {
    try{
      const res=await axios.post(
        BASE_URL + "/signup", 
        {firstName,lastName,emailId,password},
        {withCredentials:true});
      
        // console.log(res.data)
      dispatch(addUser(res.data));
      return navigate("/profile");


    }
    catch(err){
      Seterror(err?.response?.data);
      


    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen  p-4">
      {/* Login Card */}
      <div className={"bg-black/40 backdrop-blur-lg border border-gray-700 shadow-xl rounded-xl p-8 w-96 " + (Isloginform ? " " : " mt-24 mb-20")}>
        <h2 className="text-3xl font-extrabold text-white text-center mb-6">
          {Isloginform ? "Login" : "Signup"}
        </h2>

        {!Isloginform && (
          <>
            {" "}
            <div className="mb-5">
              <label className="block text-gray-300 font-medium mb-2 text-left">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your FirstName"
                value={firstName}
                onChange={(e) => Setfirstname(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-300 font-medium mb-2 text-left">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your LastName"
                value={lastName}
                onChange={(e) => Setlastname(e.target.value)}
                className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>{" "}
          </>
        )}

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-300 font-medium mb-2 text-left">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label className="block text-gray-300 font-medium mb-2 text-start">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            className="w-full p-3 bg-black/40 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Login Button */}
        <p className="text-red-600">{error}</p>
        <button
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-all"
          onClick={Isloginform ? handleLogin : handleSignup}
        >
          {Isloginform ? "Login" : "Signup"}
        </button>
        
        <div className="pt-4">
        <p onClick={() => SetIslogin((value) => !value)}
          className="text-left font-bold hover:text-blue-400 transition-all duration-300">
          {Isloginform ? "NewUser ? Signup Here" : "ExistingUser ? Login Here"}
          </p>

        </div>
        
      </div>
    </div>
  );
};

export default Login;
