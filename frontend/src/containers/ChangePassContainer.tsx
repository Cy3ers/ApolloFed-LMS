import React, { useState } from "react";
import ChangePass from "../components/ChangePass";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import client from "../config/apollo/apollo";
import { useMutation } from "@apollo/client";
import { CHANGE_PASSWORD } from "../GQL/mutations";
import { SubmitHandler } from "react-hook-form";

interface PassFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassContainer: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [changePass, { loading }] = useMutation(CHANGE_PASSWORD, { client });
  const [invalidError, setInvalidError] = useState<string | null>(null);

  const handleSubmit: SubmitHandler<PassFormInputs> = async ({ currentPassword, newPassword, confirmPassword }) => {
    try {
      const { data } = await changePass({ variables: { currentPassword, newPassword, confirmPassword } });

      if (data?.changePassword) {
        showToast("Password change Successful!");
        navigate("/dashboard");
      } else {
        setInvalidError("Invalid credentials");
        showToast("Password change Failed!");
      }
    } catch (err) {
      console.error("Failed to change Password", err);
      setInvalidError("Failed to change Password");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <ChangePass
      handleSubmit={handleSubmit}
      invalidError={invalidError}
    />
  );
};

export default ChangePassContainer;
