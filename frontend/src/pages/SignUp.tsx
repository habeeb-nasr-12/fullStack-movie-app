import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useSignup, useAuth } from "@/hooks/auth";
import AuthForm from "@/components/auth/AuthForm";
import { message } from "antd";

const SignUp: React.FC = () => {
  const { mutate: signup, isPending } = useSignup();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  const handleSignup = (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match");
      return;
    }
    signup({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <AuthForm mode="signup" onFinish={handleSignup} isPending={isPending} />
    </div>
  );
};

export default SignUp;
