import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import LoadingSpinner from './components/common/LoadingSpinner';
import { setAuthUser } from "../redux/conversationsSlice.js";

import './App.css';

const App = () => {

  const dispatch = useDispatch();

  const { data: authUser, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
				if (data.error) return null;
        if (!res.ok) {
          throw new Error('Failed to fetch authUser');
        }
        console.log("authUser is here:", data);
				return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (authUser) {
      dispatch(setAuthUser(authUser));
    }
  }, [authUser, dispatch]);

  if (isLoading) {
    return (
      <div className='h-screen flex justify-center items-center'>
        <LoadingSpinner size='lg' />
      </div>
    );
  }

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
