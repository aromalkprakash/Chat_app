import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import { sendMessageToUser } from "../../../redux/conversationsSlice.js";

const MessageInput = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.conversations.isLoading);
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const message = e.target.message.value.trim();
    if (!message || !selectedUserId) return;

    try {
      await dispatch(sendMessageToUser({ selectedUserId, message }));
      e.target.message.value = "";
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          name="message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
