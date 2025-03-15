import React from "react";
import Giraffe from "../images/giraffe.gif";
import { useDispatch, useSelector } from "react-redux";
import ColourfulText from "../components/ui/colourful-text";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // console.log(user);
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      navigate("/");
      dispatch(removeUser());
    } catch (err) {
      //Error logic maybe redirect to error page
    }
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-700">
      <div className="navbar h-16 flex items-center px-6 ">
        {/* Left Side - Logo */}
        <div className="flex-1 flex items-center">
          <img className="w-[50px] ml-3" src={Giraffe} alt="giraffe" />
          <Link to="/feed" className="ml-3 text-2xl  font-extrabold text-white">
            DevTinder
          </Link>
        </div>

        {/* Right Side - Profile Dropdown */}
        {user && (
          <div className="flex-none gap-2">
            <p className="font-bold text-xl">
              Welcome <ColourfulText text={user.firstName} />
            </p>
            <div className="dropdown dropdown-end mx-4">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-blue-400 transition-all duration-500"
              >
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <img alt="User Profile" src={user.photoUrl} className="relative w-full object-left-top"/>
                   
                </div>
                <div className="bg-green-400 w-2 rounded-full absolute  right-2 top-1 animate-bounce"></div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-black/80 backdrop-blur-lg rounded-lg z-[1] mt-3 w-52 p-2 shadow border border-gray-700"
              >
                <li>
                  <Link to="/profile" className="flex justify-between ">
                    Profile{" "}
                    <span className="badge bg-blue-500 text-white rounded-lg">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <a onClick={()=> navigate("/Connection")}>Connections</a>
                </li>

                <li>
                  <Link to="/Request">Request</Link>
                </li>

                <li>
                  <Link to="/Premium">Buy Premium</Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
