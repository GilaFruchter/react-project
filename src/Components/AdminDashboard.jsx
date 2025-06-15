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
  Button,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Divider,
} from "@mui/material";
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { getAllusers } from "../Redux/thunk";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  direction: "ltr",
  palette: {
    mode: 'dark',
    primary: {
      main: '#4db6ac',
      light: '#80cbc4',
      dark: '#00897b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7986cb',
      light: '#aab6fe',
      dark: '#495b9a',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef5350',
    },
    warning: {
      main: '#ffb300',
    },
    info: {
      main: '#29b6f6',
    },
    success: {
      main: '#66bb6a',
    },
    background: {
      default: '#263238',
      paper: '#37474F',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#b0bec5',
      disabled: '#757575',
    },
    darkGrey: {
      main: '#546E7A',
      light: '#819ca9',
      dark: '#29434e',
      contrastText: '#ffffff',
    }
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
    h3: {
      fontWeight: 700,
      fontSize: '3.5rem',
      letterSpacing: -1.5,
      lineHeight: 1.1,
      '@media (max-width:960px)': {
        fontSize: '3rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '2.2rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.6rem',
      '@media (max-width:600px)': {
        fontSize: '1.3rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.9rem',
      color: '#b0bec5',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          padding: '12px 32px',
          fontWeight: 600,
          fontSize: '1.1rem',
          textTransform: 'none',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
            opacity: 0.9,
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#00897b',
          },
        },
        outlinedSecondary: {
          borderColor: '#7986cb',
          color: '#7986cb',
          '&:hover': {
            borderColor: '#aab6fe',
            backgroundColor: 'rgba(121, 134, 203, 0.1)',
            color: '#aab6fe',
          },
        }
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#37474F',
          borderRadius: 12,
          boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        // התיקון כאן: השתמש בפונקציה שמקבלת את ה-theme
        root: ({ theme }) => ({
          '&:not(:last-of-type)': {
            marginBottom: theme.spacing(1),
          },
          borderRadius: theme.spacing(1),
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.05)',
          },
        }),
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: ({ theme }) => ({ // גם כאן נדרש theme
          fontWeight: 600,
          color: theme.palette.text.primary,
        }),
        secondary: ({ theme }) => ({ // וגם כאן
          color: theme.palette.text.secondary,
        }),
      },
    },
  },
});

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch]);

  // פריסת דף מלאה לטעינה, שגיאה וללא משתמשים
  const FullPageMessage = ({ children }) => (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        p: 3,
        textAlign: 'center',
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 6, backgroundColor: theme.palette.background.paper, maxWidth: 500 }}>
        {children}
      </Paper>
    </Box>
  );

  if (loading) {
    return (
      <FullPageMessage>
        <CircularProgress color="primary" size={50} />
        <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
          טוען משתמשים...
        </Typography>
      </FullPageMessage>
    );
  }

  if (error) {
    return (
      <FullPageMessage>
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          שגיאה בטעינת משתמשים: {error}
        </Alert>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          משהו השתבש בטעינת הנתונים.
        </Typography>
      </FullPageMessage>
    );
  }

  if (!users || users.length === 0) {
    return (
      <FullPageMessage>
        <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
          אין משתמשים להצגה כרגע.
        </Alert>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          כשיהיו משתמשים, הם יופיעו כאן.
        </Typography>
      </FullPageMessage>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${theme.palette.darkGrey.dark} 0%, ${theme.palette.background.default} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 6,
        }}
      >
        <Paper
          sx={{
            p: { xs: 2, sm: 4 },
            maxWidth: 900,
            width: '120%',
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 3,
            // boxShadow: '0 8px 30px rgba(0,0,0,0.3)', // הצל לא זמין ב-theme.components.MuiPaper.styleOverrides.root.boxShadow בצורה ישירה
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, borderBottom: `1px solid ${theme.palette.divider}`, pb: 2 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 48, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h4" color="text.primary" fontWeight={700}>
              פאנל ניהול משתמשים
            </Typography>
          </Box>

          <List sx={{ width: '100%' }}>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <ListItem
                  secondaryAction={
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="medium"
                      startIcon={<HistoryIcon />}
                      onClick={() => navigate(`/LearningHistory/${user.id}`)}
                      sx={{
                        borderRadius: 20,
                        px: 3,
                      }}
                    >
                      היסטוריה
                    </Button>
                  }
                  sx={{
                    py: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" sx={{ mt: 0.5 }}>
                        **מזהה:** {user.id} | **טלפון:** {user.phone}
                      </Typography>
                    }
                    sx={{ pr: 2 }}
                  />
                </ListItem>
                {index < users.length - 1 && <Divider component="li" sx={{ my: 1, borderColor: 'rgba(255,255,255,0.08)' }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;