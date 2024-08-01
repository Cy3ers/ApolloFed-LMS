import React, { useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import client from "../config/apollo/apollo";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../GQL/mutations";
import { SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  username: string;
  password: string;
}

const LoginContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loginUser, { loading, error }] = useMutation(LOGIN_USER, { client });
  const [invalidError, setInvalidError] = useState<string | null>(null);

  const handleSubmit: SubmitHandler<LoginFormInputs> = async ({ username, password }) => {
    try {
      const { data } = await loginUser({ variables: { username, password } });
      const token = data?.login?.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
        showToast("Login Successful!");
      } else {
        setInvalidError("Invalid credentials");
        showToast("Login Failed!");
      }
    } catch (err) {
      console.error("Failed to login", err);
      setInvalidError("Failed to login");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading tasks</p>;

  return (
    <Login
      handleSubmit={handleSubmit}
      invalidError={invalidError}
    />
  );
};

export default LoginContainer;
