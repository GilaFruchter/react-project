import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllUsers } from "../Redux/thunk";
import {
  CircularProgress,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { getAllusers } from "../Redux/thunk";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        All Users
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {users.map((user) => (
          <ListItem key={user.id} divider>
            <ListItemText
              primary={user.name}
              secondary={`ID: ${user.id} | Phone: ${user.phone}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminDashboard;