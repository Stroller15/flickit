import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-[550px] bg-white p-5 rounded-xl shadow-md">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Flickit
        </h1>
        <h1 className="mt-2 text-2xl font-bold">Login</h1>
        <p>Welcome back to flickit!</p>
        <form action="">
          <div className="mt-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="text-right text-bold mt-1">
            <Link href="/forget-password" className="underline">
              Forget Password?
            </Link>
          </div>
          <div className="mt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </form>
        <div className="mt-2">
            <h1>Don&apos;t have an account? <strong><Link className="font-bold underline" href="/register">Register</Link></strong></h1>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
