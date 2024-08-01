import React from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

interface CustomSelectProps {
  name: string;
  control: any;
  label: string;
  options: Array<{ value: string; label: string }>;
  required?: boolean;
  margin?: "normal" | "dense" | "none";
  fullWidth?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  label,
  options,
  required = false,
  margin = "normal",
  fullWidth = true
}) => (
  <FormControl
    margin={margin}
    required={required}
    fullWidth={fullWidth}
  >
    <InputLabel>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <Select
            value={value}
            onChange={onChange}
            label={label}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </>
      )}
    />
  </FormControl>
);

export default CustomSelect;
