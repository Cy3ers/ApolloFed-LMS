import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";
import CustomButton from "./custom/CustomButton";
import CustomTextField from "./custom/CustomTextField";

interface PassFormInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PassChangeProps {
  handleSubmit: SubmitHandler<PassFormInputs>;
  invalidError?: string | null;
}

const schema = Yup.object().shape({
  currentPassword: Yup.string().required("Current Password is required"),
  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string().required("Confirm Password is required")
});

const ChangePass: React.FC<PassChangeProps> = ({ handleSubmit, invalidError }) => {
  const { control, handleSubmit: formSubmit } = useForm<PassFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  return (
    <Container
      component='main'
      maxWidth='xs'
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Typography
          component='h1'
          variant='h5'
        >
          Change Password
        </Typography>
        <Box
          component='form'
          onSubmit={formSubmit(handleSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <CustomTextField
            name='currentPassword'
            control={control}
            label='Current Password'
            type='password'
          />
          <CustomTextField
            name='newPassword'
            control={control}
            label='New Password'
            type='password'
          />
          <CustomTextField
            name='confirmPassword'
            control={control}
            label='Confirm New Password'
            type='password'
          />
          {invalidError && <div className='error-msg'>{invalidError}</div>}
          <CustomButton
            type='submit'
            fullWidth
            variant='contained'
          >
            Change Password
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePass;
