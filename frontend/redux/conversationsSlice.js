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

export const { selectUser } = conversationsSlice.actions;

export default conversationsSlice.reducer;
