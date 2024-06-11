import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
    
    const queryClient = useQueryClient();
    const selectedUserId = useSelector((state) => state.conversations.selectedUserId);
    const authUser = useSelector((state) => state.conversations.authUser); 
    const selectedUser = useSelector((state) => state.conversations.usersList.find(user => user._id === selectedUserId));

    const fromMe = authUser && message.senderId === authUser._id;
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedUser ?.profilePic;
    const bubbleBgColor = fromMe ? "" : "bg-blue-500";
    const formattedTime = extractTime(message.createdAt);

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
    }, [queryClient]);

    console.log("From Me:", fromMe);

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        alt='Tailwind CSS chat bubble component'
                        src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
        </div>
    );
};

export default Message;
