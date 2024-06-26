import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions using createAsyncThunk

export const sendMessageToUser = createAsyncThunk(
  'conversations/sendMessageToUser',
  async ({ selectedUserId, message }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { authUser } = state.conversations;

    try {
      const response = await fetch(`/api/messages/send/${selectedUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`, // Assuming authUser contains a token
        },
        body: JSON.stringify({ message, senderId: authUser._id }), // Include senderId if needed
      });
      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Successful response:', data);
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error;
    }
  }
);

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async () => {
    try {
      const response = await fetch('/api/users/list');
      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Successful response:', data);
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error;
    }
  }
);

export const getMessages = createAsyncThunk(
  'conversations/getMessages',
  async (selectedUserId) => {
    try {
      const response = await fetch(`/api/messages/${selectedUserId}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('Error response:', data);
        throw new Error(data.error || 'Something went wrong');
      }

      console.log('Successful response:', data);
      return data;
    } catch (error) {
      console.error('Error during fetch:', error);
      throw error;
    }
  }
);


const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    usersList: [],
    selectedUserId: null,
    isLoadingMessages: false,  // Loading state for fetching messages
    isSendingMessage: false,   // Loading state for sending message
    error: null,
    messages: [],
    authUser: null,
    toResetSelectedUserId: null,
    searchQuery: '', 
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    toResetSelectedUserId: (state) => {
      state.toResetSelectedUserId = null;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      console.log('Auth User:', action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoadingMessages = false;
        state.usersList = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.error = action.error.message;
      })
      .addCase(sendMessageToUser.pending, (state) => {
        state.isSendingMessage = true;
      })
      .addCase(sendMessageToUser.fulfilled, (state, action) => {
        state.isSendingMessage = false;
        state.messages = [...state.messages, action.payload]; // Append new message to existing messages array
        state.lastMessage = action.payload; // Set the last message
      })
      .addCase(sendMessageToUser.rejected, (state, action) => {
        state.isSendingMessage = false;
        state.error = action.error.message;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoadingMessages = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.error = action.error.message;
      });
  },
});

export const selectFilteredUsersList = (state) => {
  const { usersList, searchQuery } = state.conversations;
  if (!searchQuery) return usersList;
  return usersList.filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()));
};


// Exporting actions
export const { selectUser, toResetSelectedUserId, setAuthUser,setSearchQuery, setMessages } = conversationsSlice.actions;

// Exporting reducer
export default conversationsSlice.reducer;


