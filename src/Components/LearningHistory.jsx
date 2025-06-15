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
  Paper,
  Box,
  Divider,
} from "@mui/material";

const LearningHistory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { prompts, loading, error } = useSelector((state) => state.prompt);
  useEffect(() => {
    if (id) {
      dispatch(GetPromptById(id));
    }
  }, [dispatch, id]); 

  return (
    <Paper
      elevation={4}
      sx={{
        p: 4,
        maxWidth: 700,
        margin: "auto",
        mt: 6,
        borderRadius: 2,
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", 
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        align="center"
        gutterBottom
        sx={{ mb: 3, color: "primary.main", fontWeight: 700 }}
      >
        היסטוריית למידה
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        עבור משתמש:{" "}
        <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
          {id}
        </Box>
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {loading && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress size={50} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            טוען היסטוריה... אנא המתן.
          </Typography>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, py: 2 }}>
          <Typography variant="body1" component="div">
            אירעה שגיאה בטעינת היסטוריית הלמידה:
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ mt: 1, fontWeight: "bold" }}
          >
            {error}
          </Typography>
        </Alert>
      )}

      {!loading && !error && (
        <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
          {prompts && prompts.length > 0 ? (
            prompts.map((promptItem, index) => (
              <React.Fragment key={promptItem.id}>
                <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                  <ListItemText
                    primary={
                      <Typography
                        component="span"
                        variant="subtitle1"
                        color="text.primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        שאלה: {promptItem.prompt}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{ display: "block", mt: 1 }}
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        תשובה: {promptItem.response}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < prompts.length - 1 && (
                  <Divider component="li" variant="inset" sx={{ ml: 0 }} />
                )}
              </React.Fragment>
            ))
          ) : (
            <Alert severity="info" sx={{ mt: 2, py: 2 }}>
              <Typography variant="body1" component="div">
                אין היסטוריית למידה זמינה עבור משתמש זה כרגע.
              </Typography>
              <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                התחל לשאול שאלות כדי לראות את ההיסטוריה כאן!
              </Typography>
            </Alert>
          )}
        </List>
      )}
    </Paper>
  );
};

export default LearningHistory;