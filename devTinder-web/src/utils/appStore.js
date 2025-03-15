import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import UserFeed from "./Userfeed";
import ConnectionReducer from "./ConnectionSlice";
import Requestreducer from "./RequestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: UserFeed,
    connection: ConnectionReducer,
    Request:Requestreducer,
  },
});

export default appStore;
