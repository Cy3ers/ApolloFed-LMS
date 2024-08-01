import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { User, UserListProps } from "../types";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import CustomTextField from "./custom/CustomTextField";
import CustomButton from "./custom/CustomButton";
import CustomSelect from "./custom/CustomSelect";

interface UserFormInputs {
  username: string;
  password: string;
  role: string;
  search?: string;
}

const schema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().required("Role is required"),
  search: Yup.string()
});

const UserList: React.FC<UserListProps> = ({ users, addUser, removeUser }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
    reset
  } = useForm<UserFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserFormInputs> = (data) => {
    addUser({ username: data.username, password: data.password, role: data.role });
    reset({ username: "", password: "", search: data.search });
  };

  const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" }
  ];

  const searchQuery = watch("search", "");

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery ? searchQuery.toLowerCase() : "")
  );

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            style={{ flexGrow: 1 }}
          >
            User Management
          </Typography>
          <Button
            color='inherit'
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth='sm'>
        <Box mt={2}>
          <Typography
            variant='h5'
            gutterBottom
          >
            Add Users
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
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
            <CustomSelect
              name='role'
              control={control}
              label='Role'
              options={roleOptions}
            />
            <Box
              mt={2}
              display='flex'
              justifyContent='center'
            >
              <CustomButton
                type='submit'
                fullWidth
                variant='contained'
                disabled={!isValid}
              >
                Add User
              </CustomButton>
            </Box>
          </Box>
        </Box>
        <Box mt={4}>
          <Typography
            variant='h5'
            gutterBottom
          >
            Search Users
          </Typography>
          <CustomTextField
            name='search'
            control={control}
            label='Search by username'
          />
        </Box>
        <Box mt={4}>
          <Typography
            variant='h5'
            gutterBottom
          >
            Users
          </Typography>
          <List>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: User) => (
                <ListItem
                  key={user.username}
                  divider
                >
                  <ListItemText primary={user.username} />
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => user.id && removeUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary='No users found' />
              </ListItem>
            )}
          </List>
        </Box>
      </Container>
    </>
  );
};

export default UserList;
