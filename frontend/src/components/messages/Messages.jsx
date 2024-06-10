import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/conversationsSlice.js';

const MessagesComponent = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversations.messages);
  const isLoading = useSelector((state) => state.conversations.isLoading);
  const error = useSelector((state) => state.conversations.error);

  useEffect(() => {
    // Fetch messages when the component mounts
    dispatch(getMessages(selectedUserId)); // Assuming selectedUserId is defined somewhere
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    console.log(messages); // Log messages when they change
  }, [messages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render your messages here

  return (
    <div>
      {/* Render messages */}
    </div>
  );
};

export default MessagesComponent;
