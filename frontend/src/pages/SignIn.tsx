import React from "react";
import { Navigate } from "react-router-dom";
import { useSignin, useAuth } from "@/hooks/auth";
import AuthForm from "@/components/auth/AuthForm";

const SignIn: React.FC = () => {
  const { mutate: signin, isPending } = useSignin();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50  px-4 sm:px-6 lg:px-8">
      <AuthForm mode="signin" onFinish={signin} isPending={isPending} />
    </div>
  );
};

export default SignIn;
