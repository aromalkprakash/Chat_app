import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import {toast }from "react-hot-toast"


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const { mutate, isPending, isError, error, } = useMutation({
        mutationFn: async ({ username, password }) => {
            try {
                const res = await fetch("/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Something went wrong");
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            toast.success("Login successful")
        },
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'>
                    Login
                    <span className='text-green-500'> Aura</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type='text'
                            placeholder='Enter username'
                            name='username'
                            className='w-full input input-bordered h-10'
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div>
                        <label className='label'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            name='password'
                            className='w-full input input-bordered h-10'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Link to="/signup" className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                        {"Don't"} have an account?
                    </Link>
                    <div>
                        <button className='btn btn-block btn-sm mt-2' >
                            {isPending ? "Loading..." : "Login"}
                        </button>
                        {isError && <p className='text-red-500'>{error.message}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;
