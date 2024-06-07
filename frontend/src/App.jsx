import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';

import { Toaster } from 'react-hot-toast';
// import { useQuery } from '@tanstack/react-query';
// import LoadingSpinner from './components/common/LoadingSpinner';

 
//     const { data: authUser, isLoading } = useQuery({
//       queryKey: ["authUser"],
//       queryFn: async () => {
//         try {
//           const res = await fetch("/api/auth/me");
//           const data = await res.json();
//           if (data.error) return null;
//           if (!res.ok) {
//             throw new Error(data.error || "Something went wrong");
//           }
//           console.log("authUser is here:", data);
//           return data;
//         } catch (error) {
//           throw new Error(error);
//         }
//       },
//       retry: false,
//     });
  
//     if (isLoading) {
//       return (
//         <div className='h-screen flex justify-center items-center'>
//           <LoadingSpinner size='lg' />
//         </div>
//       );
// };
const App = () => {
  
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
				<Route path='/signup' element={ <SignUp/> } />
        
      </Routes>
      <Toaster/>
    </div>
  )
};

export default App;
