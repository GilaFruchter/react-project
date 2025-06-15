import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, CircularProgress, Alert, IconButton,
  createTheme, ThemeProvider, CssBaseline,
  AppBar, Toolbar,
  List, ListItem, ListItemText, Divider,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SchoolIcon from "@mui/icons-material/School";
import HistoryIcon from "@mui/icons-material/History";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteUserById, getAllusers } from "../Redux/thunk";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: '#546E7A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#B0BEC5',
      light: '#CFD8DC',
      dark: '#78909C',
    },
    text: {
      primary: '#37474F',
      secondary: '#78909C',
      appBar: '#546E7A',
    },
    background: {
      default: '#ECEFF1',
      paper: '#FFFFFF',
      appBar: 'rgba(0,0,0,0.05)',
      appBarBlur: '5px',
    },
    error: { main: '#e53935' },
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2.2rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
      color: '#37474F',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    h6: {
      fontWeight: 700,
      fontSize: '1.6rem',
      color: '#37474F',
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1.05rem',
      color: '#78909C',
      textAlign: 'center',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#424242',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '#607D8B',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: '15px 30px',
          '@media (max-width:600px)': {
            padding: '10px 20px',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #ECEFF1',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&:nth-of-type(odd)': {
            backgroundColor: '#F9FBFB',
          },
          '&:hover': {
            backgroundColor: '#F0F4F8',
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '0px 0',
          borderColor: '#CFD8DC',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
          fontSize: '1.0rem',
          padding: '8px 16px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        containedError: {
          backgroundColor: '#EF5350',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D32F2F',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.95rem',
        },
      },
    },
  },
});

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error, deletionLoading, deletionError } = useSelector((state) => state.user);

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [userToDeleteName, setUserToDeleteName] = useState("");
  const [deletionStatusMessage, setDeletionStatusMessage] = useState("");
  const [deletionStatusSuccess, setDeletionStatusSuccess] = useState(false);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  const handleDeleteClick = (user) => {
    setUserToDeleteId(user.id);
    setUserToDeleteName(user.name);
    setOpenConfirmDialog(true);
    setDeletionStatusMessage("");
  };

  const handleConfirmDelete = async () => {
    setOpenConfirmDialog(false);
    setDeletionStatusMessage("");
    setDeletionStatusSuccess(false);

    if (userToDeleteId) {
      try {
        const resultAction = await dispatch(DeleteUserById(userToDeleteId));
        if (DeleteUserById.fulfilled.match(resultAction)) {
          setDeletionStatusSuccess(true);
          setDeletionStatusMessage(`User ${userToDeleteName} (ID: ${userToDeleteId}) deleted successfully.`);
        } else {
          setDeletionStatusSuccess(false);
          setDeletionStatusMessage(deletionError || resultAction.payload || `Failed to delete user ${userToDeleteName}.`);
        }
      } catch (err) {
        setDeletionStatusSuccess(false);
        setDeletionStatusMessage(`Error deleting user: ${err.message}`);
      }
    }
    setUserToDeleteId(null);
    setUserToDeleteName("");
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
    setUserToDeleteId(null);
    setUserToDeleteName("");
    setDeletionStatusMessage("");
  };

  const handleViewHistoryClick = (userId) => {
    navigate(`/LearningHistory/${userId}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100%",
          width: "120%",
          display: "flex",
          flexDirection: 'column',
          p: 0,
          overflowY: 'auto',
        }}
      >
        <AppBar position="fixed" sx={{
          background: theme.palette.background.appBar,
          backdropFilter: `blur(${theme.palette.background.appBarBlur})`,
          width: '100%',
          top: 0,
          left: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          zIndex: theme.zIndex.appBar,
        }}>
          <Toolbar>
            <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" color="text.appBar" sx={{ flexGrow: 1, fontWeight: 500 }}>
              AI Learning Platform (Admin)
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '1200px',
            paddingTop: '80px',
            paddingBottom: '24px',
            px: 2,
            margin: '0 auto', 
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
              width: '100%', // תן לו למלא את כל הרוחב הזמין בתוך ה-Box
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mb: 3, color: "primary.main", fontWeight: 700 }}
            >
              ניהול משתמשים (פאנל אדמין)
            </Typography>

            {deletionStatusMessage && (
              <Alert
                severity={deletionStatusSuccess ? "success" : "error"}
                sx={{ width: "100%", mb: 2, borderRadius: 2 }}
              >
                {deletionStatusMessage}
              </Alert>
            )}
            {loading && (
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: 150, width: "100%" }}>
                <CircularProgress size={50} sx={{ mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  טוען משתמשים...
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
                <Typography variant="body1">
                  אירעה שגיאה בטעינת משתמשים: {error}
                </Typography>
              </Alert>
            )}

            {!loading && !error && (
              <List sx={{ bgcolor: "background.paper", borderRadius: 1, width: '100%' }}>
                {users && users.length > 0 ? (
                  users.map((user, index) => (
                    <React.Fragment key={user.id}>
                      <ListItem
                        secondaryAction={
                          <Box sx={{
                            display: 'flex',
                            gap: 1,
                            flexShrink: 0,
                          }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              size="small"
                              startIcon={<HistoryIcon />}
                              onClick={() => handleViewHistoryClick(user.id)}
                              sx={{
                                minWidth: '90px',
                                justifyContent: 'center',
                              }}
                            >
                              היסטוריה
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              disabled={deletionLoading && userToDeleteId === user.id}
                              startIcon={deletionLoading && userToDeleteId === user.id ? <CircularProgress size={16} color="inherit" /> : <DeleteForeverIcon />}
                              onClick={() => handleDeleteClick(user)}
                              sx={{
                                minWidth: '90px',
                                justifyContent: 'center',
                              }}
                            >
                              מחק
                            </Button>
                          </Box>
                        }
                        sx={{
                          py: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          px: 2,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Typography component="span" variant="subtitle1" color="text.primary" sx={{ fontWeight: "bold" }}>
                              שם: {user.name} (ID: {user.id})
                            </Typography>
                          }
                          secondary={
                            <Typography sx={{ display: "block", mt: 0.5 }} component="span" variant="body2" color="text.secondary">
                              טלפון: {user.phone}
                            </Typography>
                          }
                          sx={{ flexGrow: 1, mr: 2 }}
                        />
                      </ListItem>
                      {index < users.length - 1 && (
                        <Divider component="li" variant="inset" sx={{ ml: 0 }} />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <Alert severity="info" sx={{ mt: 2, py: 2, width: '100%' }}>
                    <Typography variant="body1">
                      אין משתמשים זמינים כרגע.
                    </Typography>
                  </Alert>
                )}
              </List>
            )}
          </Paper>
        </Box>
      </Box>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-title"
        aria-describedby="confirm-delete-description"
      >
        <DialogTitle id="confirm-delete-title">{"אישור מחיקת משתמש"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-description">
            האם אתה בטוח שברצונך למחוק את המשתמש "{userToDeleteName}" (ID: {userToDeleteId})?
            פעולה זו אינה ניתנת לביטול.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary" disabled={deletionLoading}>
            ביטול
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus disabled={deletionLoading}>
            {deletionLoading ? <CircularProgress size={20} color="inherit" /> : "מחק"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AdminDas