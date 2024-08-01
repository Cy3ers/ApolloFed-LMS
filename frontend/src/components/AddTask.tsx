import React from "react";
import { useToast } from "../contexts/ToastContext";
import { useNavigate } from "react-router-dom";
import { ALL_TASKS } from "../GQL/queries";
import { CREATE_TASK } from "../GQL/mutations";
import { useGqlQuery } from "../hooks/useGraphQL";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { AppBar, Toolbar, Container, Typography, CircularProgress, Box, Button } from "@mui/material";
import CustomTextField from "./custom/CustomTextField";
import CustomButton from "./custom/CustomButton";

interface TaskFormInputs {
  title: string;
  description: string;
  status: string;
  priority: string;
}

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.string().required("Status is required"),
  priority: Yup.string().required("Priority is required")
});

const AddTask: React.FC = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isValid }
  } = useForm<TaskFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const { save: addTask, loading: addTaskLoading } = useGqlQuery({ query: ALL_TASKS, mutation: CREATE_TASK });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    try {
      await addTask(data);
      showToast("Task added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            style={{ flexGrow: 1 }}
          >
            Add Task
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
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <CustomTextField
            name='title'
            control={control}
            label='Title'
          />
          <CustomTextField
            name='description'
            control={control}
            label='Description'
          />
          <CustomTextField
            name='status'
            control={control}
            label='Status'
          />
          <CustomTextField
            name='priority'
            control={control}
            label='Priority'
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
              disabled={!isValid || addTaskLoading}
            >
              {addTaskLoading ? <CircularProgress size={24} /> : "Add Task"}
            </CustomButton>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddTask;
