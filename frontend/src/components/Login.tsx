import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Avatar, CssBaseline } from "@mui/material";
import CustomButton from "./custom/CustomButton";
import CustomTextField from "./custom/CustomTextField";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginProps {
  handleSubmit: SubmitHandler<LoginFormInputs>;
  invalidError?: string | null;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required")
});

const Login: React.FC<LoginProps> = ({ handleSubmit, invalidError }) => {
  const { control, handleSubmit: formSubmit } = useForm<LoginFormInputs>({
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
        <Avatar sx={{ m: 1, bgcolor: "primary.dark" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component='h1'
          variant='h5'
        >
          Login
        </Typography>
        <Box
          component='form'
          onSubmit={formSubmit(handleSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <CustomTextField
            name='username'
            control={control}
            label='Username'
          />
          <CustomTextField
            name='password'
            control={control}
            label='Password'
            type='password'
          />
          {invalidError && <div className='error-msg'>{invalidError}</div>}
          <CustomButton
            type='submit'
            fullWidth
            variant='contained'
          >
            Login
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
