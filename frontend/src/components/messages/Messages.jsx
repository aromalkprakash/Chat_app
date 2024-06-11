import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessages } from '../../../redux/conversationsSlice.js';
import MessageSkeleton from '../skeletons/MessageSkeleton.jsx';
import Message from './Message.jsx';
import { useQueryClient } from '@tanstack/react-query';

const Messages = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.conversations.messages);
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);
  const isLoading = useSelector((state) => state.conversations.isLoading);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['authUser'] });
  }, [queryClient]);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!isLoading && messages.length > 0 && (
        messages.map((message) => <Message key={message._id} message={message}  />)
      )}
      {isLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!isLoading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default React.memo(Messages);
