import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchConversations, selectUser,  toResetSelectedUserId } from '../../../redux/conversationsSlice'; 

const Conversation = () => {
  const dispatch = useDispatch();
  const { usersList, selectedUserId, isLoading, error } = useSelector((state) => state.conversations);

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

  if (usersList?.length === 0) return <div className='md:w-64 w-0'></div>;

  return (
    <div className='max-h-96 overflow-auto'>
      {usersList?.map((user, index) => (
        <React.Fragment key={user._id}>
          <div
            className={`flex gap-2 items-center rounded p-2 py-1 cursor-pointer 
            ${selectedUserId === user._id ? 'bg-blue-500' : 'hover:bg-sky-500'}`}
            onClick={() => handleUserClick(user._id)}
          >
            <div className='avatar online'>
              <div className='w-12 rounded-full'>
                <img
                  src={user.profilePic}
                  alt='user avatar'
                />
              </div>
            </div>

            <div className='flex flex-col flex-1'>
              <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{user.fullName}</p>
                <span className='text-xl'>🎃</span>
              </div>
            </div>
          </div>
          {index < usersList.length - 1 && <div className='divider my-0 py-0 h-1' />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Conversation;
