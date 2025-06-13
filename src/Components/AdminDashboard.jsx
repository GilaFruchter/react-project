import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CircularProgress,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Button, // ייבוא Button
} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History'; // ייבוא אייקון להיסטוריה
// אם תרצה אייקון אחר, למשל מסמך:
// import ArticleIcon from '@mui/icons-material/Article';

import { getAllusers } from "../Redux/thunk";
import { useNavigate } from "react-router-dom"; // ייבוא useNavigate

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // אתחול useNavigate

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  if (loading) {
    return (
      <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
          טוען משתמשים...
        </Typography>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          כל המשתמשים
        </Typography>
        <Alert severity="error">
          שגיאה בטעינת משתמשים: {error}
        </Alert>
      </Paper>
    );
  }

  if (!users || users.length === 0) {
    return (
      <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          כל המשתמשים
        </Typography>
        <Alert severity="info">
          אין משתמשים להצגה כרגע.
        </Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 800, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        כל המשתמשים
      </Typography>
      <List>
        {users.map((user) => (
          <ListItem
            key={user.id}
            divider
            // secondaryAction מאפשר למקם רכיב נוסף בצד ימין של ה-ListItem
            secondaryAction={
              <Button
                variant="outlined"
                size="small"
                // נשתמש באייקון כ-startIcon
                startIcon={<HistoryIcon />}
                onClick={() => navigate(`/LearningHistory/${user.id}`)} // ניווט לדף ההיסטוריה עם ID המשתמש
              >
                היסטוריה
              </Button>
            }
          >
            <ListItemText
              primary={user.name}
              secondary={`ת.ז.: ${user.id} | טלפון: ${user.phone}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminDashboard;