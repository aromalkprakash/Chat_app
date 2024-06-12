import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoSearchSharp } from 'react-icons/io5';
import { setSearchQuery } from '../../../redux/conversationsSlice';
import { filteredUsersList } from "./filterUsersList.js";
import toast from 'react-hot-toast';

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(state => state.conversations.searchQuery);

  const filteredUsersLists = filteredUsersList();
  
  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if (!searchQuery) return;
		// if (searchQuery.length < 3 ) {
		// 	return toast.error("Search term must be at least 3 characters long");
    // }
    // else 
    if (filteredUsersLists.length === 0) {
      return toast.error("no user found")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input
          type='text'
          placeholder='Search…'
          className='input input-bordered rounded-full'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
          <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
      
    </div>
  );
};

export default SearchInput;
