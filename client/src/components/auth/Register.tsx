"use client";

import React, { useEffect } from "react";
import { registerAction } from "@/actions/auth.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/common/submit-button";
import { useFormState } from "react-dom";
import { toast } from "sonner";

const Register = () => {
  const initState = {
    status: 0,
    message: "",
    errors: {},
  };
  const [state, formAction] = useFormState(registerAction, initState);

  useEffect(() => {
    if (state.status === 500) {
      toast.error(state.message);
    } else if (state.status === 200) {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <div className="mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name..."
        />
        <span className="text-red-500">{state.errors?.name}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email..."
        />
        <span className="text-red-500">{state.errors?.email}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password..."
        />
        <span className="text-red-500">{state.errors?.password}</span>
      </div>
      <div className="mt-4">
        <Label htmlFor="cpassword">Confirm Password</Label>
        <Input
          type="password"
          id="cpassword"
          name="confirm_password"
          placeholder="Confirm your password..."
        />
        <span className="text-red-500">{state.errors?.confirm_password}</span>
      </div>
      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
};

export default Register;
