import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const sendMessageToUser = createAsyncThunk(
  'conversations/sendMessageToUser',
  async ({ userId, message }) => {
    try {
      const response = await fetch(`/api/messages/send/${userId}`, {
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
    } catch (error) {
      throw new Error(error.message);
    }
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

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/messages/${conversationId}`);
      const data = await res.json();
      if (res.ok) {
        return data;
      } else {
        throw new Error(data.error || 'Failed to fetch messages');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Action to reset selected user ID
export const resetSelectedUserId = () => ({
  type: 'conversations/resetSelectedUserId'
});
const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: {
    usersList: [],
    selectedUserId: null,
    isLoading: false,
    error: null,
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
        
      })
      .addCase(sendMessageToUser.fulfilled, (state, action) => {
        
      })
      .addCase(sendMessageToUser.rejected, (state, action) => {
        
      });
  },
});

// Exporting actions
export const { selectUser, toResetSelectedUserId } = conversationsSlice.actions;

// Exporting reducer
export default conversationsSlice.reducer;