import React, { useEffect, useState } from "react";
import { logout } from "../auth";
import { Task } from "../types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { ALL_TASKS } from "../GQL/queries";
import { DELETE_TASK } from "../GQL/mutations";
import { useGqlQuery } from "../hooks/useGraphQL";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardActions,
  useMediaQuery,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loading, data, refetch } = useGqlQuery<{ tasks: Task[] }, { input: Task }>({ query: ALL_TASKS });
  const { save: deleteTask } = useGqlQuery({ query: ALL_TASKS, mutation: DELETE_TASK });

  const [drawerOpen, setDrawerOpen] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteTask = async (id: number) => {
    await deleteTask({ id: id });
    refetch();
    showToast("Task deleted successfully!");
  };

  if (loading) return <CircularProgress />;

  const tasks: Task[] = data?.tasks || [];

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "status", headerName: "Status", flex: 0.5 },
    { field: "priority", headerName: "Priority", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          variant='contained'
          color='secondary'
          onClick={() => handleDeleteTask(params.row.id)}
        >
          Delete Task
        </Button>
      )
    }
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <List>
      <ListItem onClick={() => navigate("/dashboard/task")}>
        <ListItemText primary='Add Tasks' />
      </ListItem>
      <ListItem onClick={() => navigate("/dashboard/user")}>
        <ListItemText primary='Add Users' />
      </ListItem>
      <ListItem onClick={logout}>
        <ListItemText primary='Logout' />
      </ListItem>
    </List>
  );

  return (
    <div>
      <AppBar position='static'>
        <Toolbar>
          {isSmallScreen && (
            <IconButton
              color='inherit'
              edge='start'
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography
            variant='h6'
            style={{ flexGrow: 1 }}
          >
            Admin Dashboard
          </Typography>
          {!isSmallScreen && (
            <>
              <Button
                color='inherit'
                onClick={() => navigate("/dashboard/task")}
              >
                Add Tasks
              </Button>
              <Button
                color='inherit'
                onClick={() => navigate("/dashboard/user")}
              >
                Add Users
              </Button>
              <Button
                color='inherit'
                startIcon={<LogoutIcon />}
                onClick={logout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
      <Container style={{ marginTop: "20px" }}>
        <Typography
          variant='h5'
          gutterBottom
        >
          Task List
        </Typography>
        {isSmallScreen ? (
          <Grid
            container
            spacing={2}
          >
            {tasks.map((task) => (
              <Grid
                item
                xs={12}
                key={task.id}
              >
                <Card>
                  <CardContent>
                    <Typography
                      variant='h6'
                      gutterBottom
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                    >
                      {task.description}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                    >
                      {task.status}
                    </Typography>
                    <Typography
                      variant='body1'
                      gutterBottom
                    >
                      {task.priority}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete Task
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={columns}
              disableRowSelectionOnClick
            />
          </div>
        )}
      </Container>
    </div>
  );
};

export default AdminDashboard;
