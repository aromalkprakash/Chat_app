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

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
      messages: [],
      isLoading: false,
      error: null,
    },
    reducers: {
     
    },
    extraReducers: (builder) => {
      builder
        
        .addCase(sendMessageToUser.pending, (state) => {
  
        })
        .addCase(sendMessageToUser.fulfilled, (state, action) => {
  
        })
        .addCase(sendMessageToUser.rejected, (state, action) => {
  
        });
    },
  });
  
  export default messagesSlice.reducer;
