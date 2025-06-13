import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllusers}
    //, getUserPromptsAsync } 
     from "../Redux/thunk";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, Button, Dialog, DialogTitle, DialogContent, CircularProgress
} from "@mui/material";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users || []);
  const loadingUsers = useSelector((state) => state.user?.loading);
  const prompts = useSelector((state) => state.prompts?.userPrompts || []);
  const loadingPrompts = useSelector((state) => state.prompts?.loading);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

//   const handleOpenHistory = (user) => {
//     setSelectedUser(user);
//     dispatch(getUserPromptsAsync(user.id));
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h5" align="center" sx={{ my: 2 }}>
        ניהול משתמשים
      </Typography>
      {loadingUsers && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}
      {!loadingUsers && users.length === 0 && (
        <Typography align="center" sx={{ my: 4 }}>לא נמצאו משתמשים.</Typography>
      )}
      {!loadingUsers && users.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>שם</TableCell>
              <TableCell>טלפון</TableCell>
              <TableCell>מספר מזהה</TableCell>
              <TableCell>היסטוריית למידה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpenHistory(user)}>
                    הצג היסטוריה
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          היסטוריית למידה של {selectedUser?.name}
        </DialogTitle>
        <DialogContent>
          {loadingPrompts && <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />}
          {!loadingPrompts && prompts.length === 0 && (
            <Typography align="center" sx={{ my: 4 }}>לא נמצאו שיעורים.</Typography>
          )}
          {!loadingPrompts && prompts.length > 0 && (
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
        </DialogContent>
      </Dialog>
    </TableContainer>
  );
};

export default AdminDashboard;