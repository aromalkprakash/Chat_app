import React from 'react'
import { BiLogOut } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import {toast} from "react-hot-toast"

const LogoutButton = () => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      
      try {
        const res = await fetch("/api/auth/logout", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "something went wrong")
        }
			
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("logout success")

    },
    onError: () => {
      toast.error("logout failed")
    }
  });
    const LogoutFunction = (e) => {
      e.preventDefault();
      mutate();
    }
 
  
  return (
    <div className='mt-auto'>
      <BiLogOut className='w-6 h-6 text-white cursor-pointer'
        onClick={LogoutFunction} />
    </div>
  )
};

export default LogoutButton
