import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsSend } from "react-icons/bs";
import { sendMessageToUser } from "../../../redux/conversationsSlice.js"

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.conversations.isLoading);
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUserId) return; // Don't send empty messages or if no user is selected

    try {
      await dispatch(sendMessageToUser({ userId: selectedUserId, message }));
      setMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error
    }
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3" disabled={loading}>
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
