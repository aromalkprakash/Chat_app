import React, { useEffect, useRef } from 'react';
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
  const isLoadingMessages = useSelector((state) => state.conversations.isLoadingMessages);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['authUser'] });
  }, [queryClient]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!isLoadingMessages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={message._id} ref={index === messages.length - 1 ? lastMessageRef : null}>
            <Message message={message} />
          </div>
        ))}

      {isLoadingMessages && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!isLoadingMessages && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default React.memo(Messages);
