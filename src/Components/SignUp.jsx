import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Avatar,
  Paper,
  Alert,
  AppBar,
  Toolbar,
  CssBaseline,
  CircularProgress,
  Fade,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../Redux/thunk';

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: {
      main: "#607D8B",
      light: "#90A4AE",
      dark: "#455A64",
    },
    secondary: { main: "#B0BEC5" },
    background: {
      default: "#ECEFF1",
      appBar: 'rgba(0,0,0,0.1)',
      appBarBlur: '5px',
    },
    success: { main: "#66BB6A" },
    error: { main: "#EF5350" },
    text: {
      primary: '#333333',
      secondary: '#757575',
      appBar: '#607D8B',
    }
  },
  typography: {
    fontFamily: 'Varela Round, Alef, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 0.2,
      fontSize: '2.2rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
      color: "#607D8B",
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
      color: "#78909C",
    },
    body1: {
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          padding: '10px 24px',
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
        containedPrimary: {
          background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          color: 'white',
          '&:hover': {
            background: theme => `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
          },
          "&.Mui-disabled": {
            background: theme => `linear-gradient(45deg, ${theme.palette.primary.light} 30%, ${theme.palette.primary.light} 90%)`,
            opacity: 0.7,
            color: 'white',
          }
        },
        outlinedSecondary: {
          borderColor: '#90A4AE',
          color: theme => theme.palette.primary.main,
          '&:hover': {
            backgroundColor: 'rgba(144, 164, 174, 0.08)',
            borderColor: '#78909C',
          }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          background: "#FFFFFF",
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 18px 50px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#CFD8DC',
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 4px ${theme.palette.primary.light}50`,
            },
          },
          '& .MuiInputLabel-root': {
            color: theme.palette.text.secondary,
          },
          '& .MuiInputBase-input': {
            color: theme.palette.text.primary,
          },
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.9rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
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
  },
});

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setLoading(true);
    if (!id || !firstName.trim() || !phone.trim()) {
      setMessage('עליך למלא את כל השדות!');
      setLoading(false);
      return;
    }
    const customerData = {
      Id: Number(id),
      name: firstName,
      phone: phone,
    };
    try {
      const resultAction = await dispatch(createNewUser(customerData));
      if (createNewUser.fulfilled.match(resultAction)) {
        setMessage('נרשמת בהצלחה!');
        await new Promise(res => setTimeout(res, 1000));
        navigate(`/CheckCategory/${firstName}/${id}`);
      } else {
        const errorMessage = resultAction.payload || resultAction.error?.message || 'ההרשמה נכשלה.';
        setMessage('ההרשמה נכשלה: ' + errorMessage);
      }
    } catch (error) {
      setMessage('שגיאה: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          position: 'fixed',
          top: 0,
          left: 0,
          background: theme => `linear-gradient(135deg, ${theme.palette.background.default} 0%, #F5F5F5 100%)`,
          display: "flex",
          flexDirection: 'column',
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          overflow: 'hidden',
        }}
      >
        <AppBar position="static" sx={{
          background: theme.palette.background.appBar,
          backdropFilter: `blur(${theme.palette.background.appBarBlur})`,
          width: '100%',
          top: 0,
          left: 0,
          position: 'absolute',
        }}>
          <Toolbar>
            <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" color="text.appBar" sx={{ flexGrow: 1, fontWeight: 500 }}>
              AI Learning Platform
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <Fade in timeout={800}>
            <Paper
              elevation={8}
              sx={{
                p: { xs: 3, sm: 5 },
                width: 400,
                maxWidth: "95vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mt: { xs: 8, sm: 10 },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 64,
                  height: 64,
                  mb: 1,
                  boxShadow: "0 6px 20px rgba(96, 125, 139, 0.3)",
                }}
              >
                <PersonAddAlt1Icon fontSize="large" />
              </Avatar>
              <Typography variant="h4" color="text.primary" gutterBottom>
                הרשמה למערכת
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" mb={2}>
                הכנס/י את פרטיך כדי להירשם
              </Typography>
              {message && (
                <Alert
                  severity={message.includes('בהצלחה') ? "success" : "error"}
                  sx={{ width: "100%", mb: 1, fontWeight: 600, fontSize: "0.95rem" }}
                >
                  {message}
                </Alert>
              )}
              <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
                <TextField
                  label="סיסמה (קוד)"
                  variant="outlined"
                  fullWidth
                  value={id || ''}
                  InputProps={{ readOnly: true }}
                  sx={{
                    mb: 3,
                    background: "#FBFBFB",
                    borderRadius: 8,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                  }}
                />
                <TextField
                  label="שם פרטי:"
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{
                    mb: 3,
                    background: "#FBFBFB",
                    borderRadius: 8,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                  }}
                  required
                />
                <TextField
                  label="מספר טלפון:"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{
                    mb: 3,
                    background: "#FBFBFB",
                    borderRadius: 8,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                  }}
                  required
                />
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                    disabled={!firstName.trim() || !phone.trim() || loading}
                    sx={{
                      px: 3,
                      fontWeight: 700,
                    }}
                  >
                    הרשמה
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;