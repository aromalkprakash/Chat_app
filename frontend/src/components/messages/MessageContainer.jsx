import React from 'react';
import { useSelector } from 'react-redux';
import { TiMessages } from 'react-icons/ti';
import MessageInput from './MessageInput';
import Messages from './Messages';
import { useQueryClient } from '@tanstack/react-query';

const MessageContainer = ({ selectedUserId }) => {

  const queryClient = useQueryClient();
  const authUser = queryClient.getQueryData(['authUser']); // Ensure this is the correct way to get authUser

  const noChatSelected = !selectedUserId;

  const selectedUser = useSelector((state) => state.conversations.usersList.find(user => user._id === selectedUserId)
  );

  return (
    <div className='md:min-w-[450px] flex flex-col'>
      {noChatSelected ? <NoChatSelected authUser = {authUser} /> : (
        <>
          <div className='bg-slate-500 px-4 py-2 mb-2'>
            <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedUser?.fullName}</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = ({authUser}) => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {authUser?.fullName}❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};
