import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async actions using createAsyncThunk
export const sendMessageToUser = createAsyncThunk(
  'conversations/sendMessageToUser',
  async ({ selectedUserId, message }) => {
    const response = await fetch(`/api/messages/send/${selectedUserId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
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

// Action to reset selected user ID
export const resetSelectedUserId = () => ({
  type: 'conversations/resetSelectedUserId',
});

export const setMessages = (messages) => ({
  type: 'conversations/setMessages',
  payload: messages,
});


// Slice
const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    usersList: [],
    selectedUserId: null,
    isLoading: false,
    error: null,
    messages: [], // Add messages to the initial state
  },
  reducers: {
    selectUser: (state, action) => {
      state.selectedUserId = action.payload;
    },
    toResetSelectedUserId: (state) => {
      state.selectedUserId = null;
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
        // Optionally update messages state with the newly sent message
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
        state.messages = action.payload; // Update state with fetched messages
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

// Exporting actions
export const { selectUser, toResetSelectedUserId } = conversationsSlice.actions;

// Exporting reducer
export default conversationsSlice.reducer;