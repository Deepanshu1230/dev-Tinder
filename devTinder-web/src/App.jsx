import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import "react-toastify/dist/ReactToastify.css";
import Mainpage from "./components/Mainpage";
import Mainpart from "./components/Mainpart";
import { ToastContainer, toast } from "react-toastify";
import Connection from "./components/Connection";
import Request from "./components/Request";
import Premium from "./components/Premium";
import './index.css';

const App = () => {
  return (
    <div>
      <div>
        
        <Provider store={appStore}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Body />}>
                <Route index element={<Mainpage />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/Connection" element={<Connection />} />
                <Route path="/Request" element={<Request />} />
                <Route path="/Premium" element={<Premium />} />

              </Route>
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </div>
  );
};

export default App;
