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
import { useDispatch } from "react-redux";
import { getUserById, createNewUser } from "../Redux/thunk";

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: "#00bcd4" },
    background: { default: "#f4f8fb" },
    success: { main: "#43a047" },
    error: { main: "#e53935" },
  },
  typography: {
    fontFamily: 'Varela Round, Alef, sans-serif',
    h4: { fontWeight: 900, letterSpacing: 1 },
    subtitle1: { fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1.1rem",
          boxShadow: "0 2px 12px 0 rgba(21,101,192,0.10)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 28,
          boxShadow: "0 8px 32px 0 rgba(21,101,192,0.13)",
          background: "rgba(255,255,255,0.95)",
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
  const dispatch = useDispatch();
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
        const cleanName = user?.name ? user.name.trim() : "User";
        setSuccess(true);
        setMessage(`ברוך הבא, ${cleanName}!`);
        setTimeout(() => {
         navigate(`/CheckCategory/${user.name.replace(/^\s+|\s+$/g, '').replace(/\s+/g, '-')}/${user.id}`);
        }, 1200);
      } else {
        setSuccess(false);
        setMessage("משתמש לא נמצא. נא להירשם.");
        setTimeout(() => {
          navigate(`/SignUp/${id}`);
        }, 1500);
      }
    } catch (error) {
      setSuccess(false);
      setMessage("שגיאה בכניסה. נסה שוב.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundRepeat: "repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
              backdropFilter: "blur(2px)",
            }}
          >
            <Avatar
              sx={{
                bgcolor: "primary.main",
                width: 70,
                height: 70,
                mb: 1,
                boxShadow: "0 4px 16px 0 rgba(21,101,192,0.18)",
              }}
            >
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography variant="h4" color="primary" gutterBottom>
              התחברות למערכת
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              הכנס/י תעודת זהות כדי להמשיך
            </Typography>
            {message && (
              <Alert
                severity={success ? "success" : "error"}
                sx={{ width: "100%", mb: 1, fontWeight: 600, fontSize: "1rem" }}
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
                      <IconButton onClick={() => setShowId((prev) => !prev)}>
                        {showId ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  background: "#f7fafc",
                  borderRadius: 2,
                  boxShadow: "0 1px 4px 0 rgba(21,101,192,0.06)",
                }}
              />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<PersonAddAlt1Icon />}
                  onClick={() => navigate("/CheckCategory/guest/000")}
                  sx={{
                    px: 3,
                    fontWeight: 700,
                    border: "2px solid #00bcd4",
                    background: "rgba(0,188,212,0.07)",
                    "&:hover": {
                      background: "#e0f7fa",
                      borderColor: "#00bcd4",
                    },
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
                    border: "2px solid #1565c0",
                    background: "linear-gradient(90deg, #1976d2 60%, #00bcd4 100%)",
                    color: "#fff",
                    boxShadow: "0 2px 8px 0 rgba(21,101,192,0.13)",
                    transition: "all 0.2s",
                    "&:hover": {
                      background: "linear-gradient(90deg, #1565c0 80%, #00bcd4 100%)",
                    },
                    "&.Mui-disabled": {
                      background: "#e3f0ff",
                      color: "#1976d2",
                      border: "2px solid #1976d2",
                      opacity: 0.7,
                    },
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
