import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface CustomTextFieldProps {
  name: string;
  control: any;
  label: string;
  type?: string;
  required?: boolean;
  margin?: "normal" | "dense" | "none";
  fullWidth?: boolean;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  control,
  label,
  type = "text",
  required = false,
  margin = "normal",
  fullWidth = true
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        margin={margin}
        required={required}
        fullWidth={fullWidth}
        label={label}
        type={type}
        onChange={onChange}
        value={value}
        error={!!error}
        helperText={error ? error.message : null}
      />
    )}
  />
);

export default CustomTextField;
