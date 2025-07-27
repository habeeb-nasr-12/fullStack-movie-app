import React, { useMemo, useCallback } from "react";
import { Form, Input, Button, Card, Typography, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

export type AuthFormMode = "signin" | "signup";

interface AuthFormProps {
  mode: AuthFormMode;
  onFinish: (values: any) => void;
  isPending?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onFinish, isPending }) => {
  const isSignin = mode === "signin";
  const isSignup = mode === "signup";

  const title = useMemo(() => 
    isSignin ? "Sign in to your account" : "Create your account", 
    [isSignin]
  );

  const subtitle = useMemo(() => 
    isSignin 
      ? "Welcome back to MovieHub! Please enter your details."
      : "Join us at MovieHub ! Please fill in your details to get started.",
    [isSignin]
  );

  const submitText = useMemo(() => 
    isSignin ? "Sign In" : "Sign Up", 
    [isSignin]
  );

  const linkText = useMemo(() => 
    isSignin ? "Don't have an account?" : "Already have an account?", 
    [isSignin]
  );

  const linkAction = useMemo(() => 
    isSignin ? "Sign up" : "Sign in", 
    [isSignin]
  );

  const linkPath = useMemo(() => 
    isSignin ? "/signup" : "/signin", 
    [isSignin]
  );

  const handleSubmit = useCallback((values: any) => {
    onFinish(values);
  }, [onFinish]);

  return (
    <div className="max-w-md w-full space-y-8" role="main" aria-label="Authentication form">
      <div className="text-center">
        <Title level={2} className="text-gray-900">
          {title}
        </Title>
        <Text className="text-gray-600">
          {subtitle}
        </Text>
      </div>

      <Card className="shadow-lg">
        <Form
          name={mode}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
          aria-label={`${mode} form`}
        >
          {isSignup && (
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your name!" },
                { min: 2, message: "Name must be at least 2 characters!" },
                { max: 100, message: "Name must be less than 100 characters!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your full name"
                aria-label="Full name"
              />
            </Form.Item>
          )}

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter your email"
              type="email"
              aria-label="Email address"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Enter your password"
              aria-label="Password"
            />
          </Form.Item>

          {isSignup && (
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Confirm your password"
                aria-label="Confirm password"
              />
            </Form.Item>
          )}

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              className="w-full"
              size="large"
              aria-label={submitText}
            >
              {isPending ? "Loading..." : submitText}
            </Button>
          </Form.Item>
        </Form>

        <Divider>
          <Text type="secondary">or</Text>
        </Divider>

        <div className="text-center">
          <Text className="text-gray-600">{linkText}</Text>{" "}
          <Link 
            to={linkPath}
            className="text-brand-500 hover:text-brand-600 font-medium"
            aria-label={`Go to ${linkAction} page`}
          >
            {linkAction}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default AuthForm; 