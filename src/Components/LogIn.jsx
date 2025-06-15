import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Fade
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // הוחזר הייבוא של useDispatch
import { getUserById, createNewUser } from "../Redux/thunk"; // הוחזרו הייבואים של ה-thunks

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: "#607D8B" }, // Blue-grey for primary actions/branding
    secondary: { main: "#B0BEC5" }, // Lighter blue-grey for secondary actions
    background: { default: "#ECEFF1" }, // Very light grey for the overall background
    success: { main: "#66BB6A" }, // Green for success messages
    error: { main: "#EF5350" }, // Red for error messages
    text: {
      primary: '#333333', // Dark grey for main text
      secondary: '#757575', // Medium grey for secondary text
    }
  },
  typography: {
    fontFamily: 'Varela Round, Alef, sans-serif',
    h4: {
      fontWeight: 700, // Slightly less bold than 800/900 for a cleaner look
      letterSpacing: 0.2, // Tighter letter spacing
      fontSize: '2.2rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
    },
    subtitle1: {
      fontWeight: 400, // Lighter for sub-heading
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '0.9rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Less rounded corners for a modern, clean line
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1rem",
          padding: '10px 24px',
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)", // Very subtle shadow
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          },
        },
        containedPrimary: {
            background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, #78909C 90%)`, // Gradient for primary button
            color: 'white',
            '&:hover': {
                background: theme => `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
            }
        },
        outlinedSecondary: {
            borderColor: '#90A4AE', // Lighter shade of primary for outline
            color: theme => theme.palette.text.secondary, // Use secondary text color for outline button text
            '&:hover': {
                backgroundColor: 'rgba(144, 164, 174, 0.08)', // Subtle hover background
                borderColor: '#78909C', // Darker border on hover
            }
        }
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Modern, less rounded corners
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)", // Softer, more spread out shadow
          background: "#FFFFFF",
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)', // Less aggressive lift
            boxShadow: '0 18px 50px rgba(0,0,0,0.12)', // Slightly stronger shadow on hover
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Consistent rounded corners
            transition: 'box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
            '& fieldset': {
                borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#CFD8DC', // Subtle darker grey on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: theme.palette.primary.main,
              boxShadow: `0 0 0 4px ${theme.palette.primary.light}50`, // Glow from primary light shade
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
  },
});

const LogIn = () => {
  const [id, setId] = useState("");
  const [showId, setShowId] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch(); // הוחזר useDispatch
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccess(false);
    setLoading(true);
    try {

      const result = await dispatch(getUserById(id)); 

      if (getUserById.fulfilled.match(result)) {
        const user = result.payload;
        const cleanName = user?.name ? user.name.trim() : "משתמש";
        setSuccess(true);
        setMessage(`ברוך הבא, ${cleanName}!`);
        setTimeout(() => {
          navigate(`/CheckCategory/${encodeURIComponent(cleanName.replace(/\s+/g, '-'))}/${user.id}`);
        }, 1200);
      } else {
        // אם ה-thunk נדחה (rejected), תהיה שגיאה
        setSuccess(false);
        setMessage("משתמש לא נמצא. נא להירשם.");
        setTimeout(() => {
          navigate(`/SignUp/${id}`);
        }, 1500);
      }
    } catch (error) {
      // טיפול בשגיאות בלתי צפויות
      setSuccess(false);
      setMessage("שגיאה בכניסה. נסה שוב.");
      console.error("Login error:", error); // הדפסת שגיאה לקונסול
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          position: 'fixed',
          top: 0,
          left: 0,
          background: theme => `linear-gradient(135deg, ${theme.palette.background.default} 0%, #F5F5F5 100%)`, // Very subtle grey-white gradient
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          overflow: 'hidden',
        }}
      >
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
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 64, 
                height: 64,
                mb: 1,
                boxShadow: "0 6px 20px rgba(96, 125, 139, 0.3)", // Shadow based on primary color
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" color="text.primary" gutterBottom>
              התחברות למערכת
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              הכנס/י תעודת זהות כדי להמשיך
            </Typography>
            {message && (
              <Alert
                severity={success ? "success" : "error"}
                sx={{ width: "100%", mb: 1, fontWeight: 600, fontSize: "0.95rem" }}
              >
                {message}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <TextField
                label="תעודת זהות"
                variant="outlined"
                fullWidth
                value={id}
                onChange={(e) => setId(e.target.value)}
                type={showId ? "text" : "password"}
                autoFocus
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowId((prev) => !prev)}
                        edge="end"
                      >
                        {showId ? <VisibilityOff color="action" /> : <Visibility color="action" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  background: "#FBFBFB", // רקע בהיר יותר לשדה הקלט
                  borderRadius: 8, // עקביות עם פינות מעוגלות
                  boxShadow: "0 1px 6px rgba(0,0,0,0.03)", // צל עדין מאוד
                }}
              />
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                <Button
                  variant="outlined"
                  color="secondary" // Uses new secondary palette color
                  startIcon={<PersonAddAlt1Icon />}
                  onClick={() => navigate("/CheckCategory/guest/000")}
                  sx={{
                    px: 3,
                    fontWeight: 700,
                    minWidth: { xs: '140px', sm: 'auto' },
                    mb: { xs: 2, sm: 0 },
                  }}
                >
                  כניסת אורח
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!id.trim() || loading}
                  endIcon={
                    loading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : (
                      <SendIcon />
                    )
                  }
                  sx={{
                    px: 3,
                    fontWeight: 700,
                    minWidth: { xs: '140px', sm: 'auto' },
                  }}
                >
                  התחבר
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default LogIn;
