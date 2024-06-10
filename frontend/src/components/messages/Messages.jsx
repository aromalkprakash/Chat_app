import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/conversationsSlice.js';

import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import Message from './Message.jsx';

const Messages = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversations.messages);
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);
  const isLoading = useSelector((state) => state.conversations.isLoading); // Changed to isLoading
  const error = useSelector((state) => state.conversations.error);

  useEffect(() => {
    // Fetch messages when the component mounts or when selectedUserId changes
    if (selectedUserId) {
      dispatch(getMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    console.log(messages); // Log messages when they change
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!isLoading && messages.length > 0 && 
        messages.map((message) => <Message key={message._id} message={message} />)}

      {isLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!isLoading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
