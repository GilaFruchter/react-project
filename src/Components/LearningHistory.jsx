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
  Box // ודא ש-Box מיובא
} from "@mui/material";

const LearningHistory = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // ודא שהנתיב שלך ב-App.js הוא /LearningHistory/:id

  // קח את הסטייט מה-slice של prompts (או איך שקראת לו)
  const { prompts, loading, error } = useSelector((state) => state.prompt);

  useEffect(() => {
    if (id) {
      dispatch(GetPromptById(id));
    }
  }, [dispatch, id]);

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        היסטוריית למידה עבור משתמש: {id} {/* מציג את ID המשתמש */}
      </Typography>

      {/* מצב טעינה */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 100 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
            טוען היסטוריה...
          </Typography>
        </Box>
      )}

      {/* מצב שגיאה */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* הצגת רשימת הפרומפטים */}
      {!loading && !error && (
        <List>
          {prompts && prompts.length > 0 ? (
            prompts.map((promptItem) => ( // שיניתי את השם ל-promptItem למניעת בלבול עם המשתנה prompt מה-slice
              <ListItem key={promptItem.id} divider>
                <ListItemText
                  primary={promptItem.prompt}
                  secondary={promptItem.response}
                />
              </ListItem>
            ))
          ) : (
            // הודעה כשאין נתונים, מוצגת רק אם אין טעינה ואין שגיאה
            <Alert severity="info" sx={{ mt: 2 }}>
              אין היסטוריה זמינה עבור משתמש זה.
            </Alert>
          )}
        </List>
      )}
    </Paper>
  );
};

export default LearningHistory;