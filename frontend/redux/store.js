import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./userLists/conversationsSlice.js";
import messagesSliceReducer from "./Messages/messagesSlice.js";

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    sendMessageToUser: messagesSliceReducer,
  },
});

