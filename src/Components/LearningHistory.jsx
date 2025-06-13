import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getUserPromptsAsync } from "../Redux/thunk"; // ודא שיש thunk כזה
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress
} from "@mui/material";

const LearningHistory = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.user?.id); // עדכן לפי מבנה ה-state שלך
  const prompts = useSelector((state) => state.prompts?.userPrompts || []);
  const loading = useSelector((state) => state.prompts?.loading);
  const error = useSelector((state) => state.prompts?.error);

//   useEffect(() => {
//     if (userId) {
//       dispatch(getUserPromptsAsync(userId));
//     }
//   }, [userId, dispatch]);

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        היסטוריית למידה
      </Typography>
      {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}
      {error && <Typography color="error" align="center">{error}</Typography>}
      {!loading && prompts.length === 0 && (
        <Typography align="center" sx={{ my: 4 }}>לא נמצאו שיעורים קודמים.</Typography>
      )}
      {!loading && prompts.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>קטגוריה</TableCell>
              <TableCell>תת־קטגוריה</TableCell>
              <TableCell>שאלה</TableCell>
              <TableCell>תשובת AI</TableCell>
              <TableCell>תאריך</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prompts.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.categoryName || row.category?.name}</TableCell>
                <TableCell>{row.subCategoryName || row.subCategory?.name}</TableCell>
                <TableCell>{row.prompt}</TableCell>
                <TableCell>{row.response}</TableCell>
                <TableCell>{new Date(row.created_at).toLocaleString("he-IL")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default LearningHistory;