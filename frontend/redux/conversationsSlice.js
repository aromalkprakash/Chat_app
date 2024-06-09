import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
    // Reducer case to reset selected user ID
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
      });
  },
});

export const { selectUser, toResetSelectedUserId } = conversationsSlice.actions;

export default conversationsSlice.reducer;
