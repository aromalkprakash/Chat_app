import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUp = () => {

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ fullName, username, password, confirmPassword, gender }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");

      queryClient.invalidateQueries({queryKey: ["authUser"]})
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCheckboxChange = (gender) => {
    setFormData({ ...formData, gender });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-green-500"> Aura</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Name"
              className="w-full input input-bordered h-10"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              name="username"
              placeholder="username"
              className="w-full input input-bordered h-10"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full input input-bordered h-10"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={formData.gender} />

          <Link to="/Login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
            Already have an account?
          </Link>
          
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-500"
              style={{ backgroundColor: "black", color: "white" }}
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Sign up"}
            </button>
            {isError && <p className='text-red-500'>{error.message}</p>}

          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
