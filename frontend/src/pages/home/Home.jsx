import React from 'react'
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  const selectedUserId = useSelector((state) => state.conversations.selectedUserId);

  return (
    <div>
      <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <Sidebar />
        <MessageContainer selectedUserId={selectedUserId} />
      </div>
    </div>
  )
}; 

export default Home;