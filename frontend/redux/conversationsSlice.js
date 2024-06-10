import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions using createAsyncThunk

export const sendMessageToUser = createAsyncThunk(
  'conversations/sendMessageToUser',
  async ({ selectedUserId, message }, thunkAPI) => {
    const state = thunkAPI.getState();
    const { authUser } = state.conversations;

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
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }
);

export const fetchConversations = createAsyncThunk(
  'conversations/fetchConversations',
  async () => {
    const response = await fetch('/api/users/list');
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }
);

export const getMessages = createAsyncThunk(
  'conversations/getMessages',
  async (selectedUserId) => {
    const response = await fetch(`/api/messages/${selectedUserId}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }
    return data;
  }
);

// Slice
const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    usersList: [],
    selectedUserId: null,
    isLoading: false,
    error: null,
    messages: [],
    authUser: null, // Add authUser to the initial state
    toResetSelectedUserId: null,
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    toResetSelectedUserId: (state) => {
      state.toResetSelectedUserId = null;
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
      console.log('Auth User:', action.payload);// Log the authUser

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.usersList = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(sendMessageToUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessageToUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessageToUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Exporting actions
export const { selectUser, toResetSelectedUserId, setAuthUser } = conversationsSlice.actions;

// Exporting reducer
export default conversationsSlice.reducer;
