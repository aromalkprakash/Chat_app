import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "../context/socketContext";
import { useEffect } from "react";
import { setMessages } from '../../redux/conversationsSlice.js';
import notificationSound from  "../assets/sounds/notification.mp3";

const useListenMessage = () => {
  const dispatch = useDispatch();
  const { socket } = useSocketContext();
  const messages = useSelector((state) => state.conversations.messages);

  useEffect(() => {
    if (socket) {
      console.log('Socket is connected, setting up listener for newMessage');
        socket.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
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
