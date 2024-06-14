import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/socketContext";
import { useEffect } from "react";
import { setMessages } from '../../redux/conversationsSlice.js';

const useListenMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const messages = useSelector((state) => state.conversations.messages);

  useEffect(() => {
    if (socket) {
      console.log('Socket is connected, setting up listener for newMessage');
      socket.on("newMessage", (newMessage) => {
        console.log('Received newMessage event:', newMessage);
        dispatch(setMessages([...messages, newMessage]));
      });
    }

    return () => {
      if (socket) {
        console.log('Cleaning up listener for newMessage');
        socket.off("newMessage");
      }
    };
  }, [socket, dispatch, messages]);
};

export default useListenMessage;
