import { configureStore } from '@reduxjs/toolkit';
import conversationsReducer from './conversationsSlice.js'

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
  },
});
