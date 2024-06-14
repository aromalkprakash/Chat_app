import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/socketContext";
import { useEffect } from "react";
import { setMessages } from '../../redux/conversationsSlice.js'

const useListenMessage = () => {
    const dispatch = useDispatch();
    const { socket } = useSocketContext();
    const messages = useSelector((state) => state.conversations.messages);

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            dispatch(setMessages([...messages, newMessage]));
        };

        if (socket) {
            socket.on("newMessage", handleNewMessage);
        }

        return () => {
            
                socket.off("newMessage", handleNewMessage);
            }
        
    }, [socket, dispatch, messages]);
};

export default useListenMessage;
