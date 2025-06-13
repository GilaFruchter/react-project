import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPromptById } from "../Redux/thunk";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from "@mui/material";

const LearningHistory = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // make sure your route is /LearningHistory/:id

  // קח את הסטייט מה-slice של prompts
  const { prompts, loading, error } = useSelector((state) => state.prompt);

  useEffect(() => {
    if (id) {
      dispatch(GetPromptById(id));
    }
  }, [dispatch, id]);

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Learning History
      </Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        {prompts && prompts.length > 0 ? (
          prompts.map((prompt) => (
            <ListItem key={prompt.id} divider>
              <ListItemText
                primary={prompt.prompt}
                secondary={prompt.response}
              />
            </ListItem>
          ))
        ) : (
          <Typography>No history found.</Typography>
        )}
      </List>
    </Paper>
  );
};

export default LearningHistory;