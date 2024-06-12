import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchConversations, selectUser, toResetSelectedUserId, } from "../../../redux/conversationsSlice";
import { filteredUsersList } from "./filterUsersList.js";

const Conversation = () => {
  const dispatch = useDispatch();
  const { selectedUserId, isLoading, error, } = useSelector((state) => state.conversations);
  
  const filteredUsersLists = filteredUsersList();

  useEffect(() => {
    dispatch(fetchConversations());

    // Cleanup function to reset selected user ID when component unmounts
    return () => {
      dispatch(toResetSelectedUserId());
    };
  }, [dispatch]);

  const handleUserClick = (userId) => {
    dispatch(selectUser(userId));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-h-96 overflow-auto">
      {(filteredUsersLists.map((user, index) => (
          <React.Fragment key={user._id}>
            <div
              className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer 
              ${
                selectedUserId === user._id ? "bg-blue-500" : "hover:bg-sky-500"
              }`}
              onClick={() => handleUserClick(user._id)}
            >
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src={user.profilePic} alt="user avatar" />
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                  <p className="font-bold text-gray-200">{user.fullName}</p>
                  <span className="text-xl">🎃</span>
                </div>
              </div>
            </div>
            {index < filteredUsersLists.length - 1 && (
              <div className="divider my-0 py-0 h-1" />
            )}
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default Conversation;
