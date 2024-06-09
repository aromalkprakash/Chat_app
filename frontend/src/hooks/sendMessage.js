import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageToUser } from "../redux/conversationsSlice.js";

const SendMessage = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);
  const loading = useSelector((state) => state.conversations.isLoading);

  const handleMessageSend = async () => {
    if (!message.trim()) return; // Don't send empty messages

    try {
      await dispatch(sendMessageToUser({ userId: selectedUserId, message }));
      setMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleMessageSend} disabled={loading}>
        {loading ? "Sending..." : "Send"}
      </button>
    </div>
  );
};

export default SendMessage;

