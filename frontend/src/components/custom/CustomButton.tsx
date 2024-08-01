import React from "react";
import { Button, CircularProgress } from "@mui/material";

interface CustomButtonProps {
  type: "button" | "submit" | "reset";
  fullWidth?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?: "inherit" | "primary" | "secondary";
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  type,
  fullWidth = false,
  variant = "contained",
  color = "primary",
  disabled = false,
  loading = false,
  children
}) => (
  <Button
    type={type}
    fullWidth={fullWidth}
    variant={variant}
    color={color}
    disabled={disabled}
  >
    {loading ? <CircularProgress size={24} /> : children}
  </Button>
);

export default CustomButton;
