
import Register from "@/components/auth/Register";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[550px] bg-white p-5 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Flickit
        </h1>
        <h1 className="mt-2 text-2xl font-bold">Register</h1>
        <p>Welcome back to flickit!</p>
        <Register />
        <div className="mt-2">
            <h1>Already have an account? <strong><Link className="font-bold underline" href="/login">Login</Link></strong></h1>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
