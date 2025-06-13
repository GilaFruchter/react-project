import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Avatar,
  Paper,
  CircularProgress,
  Alert,
  Fade
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createNewUserAsyncAction, getUserById } from "../Redux/thunk";

const theme = createTheme({
  direction: "ltr",
  palette: {
    primary: { main: "#1976d2" },
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
          background: "rgba(255,255,255,0.97)",
        },
      },
    },
  },
});

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: paramId } = useParams();

  const [id, setId] = useState(paramId || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    if (!id.trim() || !name.trim() || !phone.trim()) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      const customerData = {
        id: parseInt(id),
        name,
        phone,
      };
      const resultAction = await dispatch(createNewUserAsyncAction(customerData));
      if (createNewUserAsyncAction.fulfilled.match(resultAction)) {
        setSuccess(true);
        setMessage("Registration successful! Redirecting...");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await dispatch(getUserById(id));
        navigate(`/CheckCategory/${name}`);
      } else {
        setSuccess(false);
        setMessage("Registration failed: " + (resultAction.error?.message || "Unknown error"));
      }
    } catch (error) {
      setSuccess(false);
      setMessage("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, #e3f0ff 0%, #f9f9f9 100%), url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')`,
          backgroundRepeat: "repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Fade in timeout={800}>
          <Paper
            elevation={10}
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
                bgcolor: "secondary.main",
                width: 70,
                height: 70,
                mb: 1,
                boxShadow: "0 4px 16px 0 rgba(0,188,212,0.18)",
              }}
            >
              <PersonAddAlt1Icon fontSize="large" />
            </Avatar>
            <Typography variant="h4" color="primary" gutterBottom>
              Sign Up
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>
              Please fill in your details to register
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
                label="ID Number"
                variant="outlined"
                fullWidth
                value={id}
                onChange={(e) => setId(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 9 }}
                sx={{
                  mb: 2,
                  background: "#f7fafc",
                  borderRadius: 2,
                  boxShadow: "0 1px 4px 0 rgba(21,101,192,0.06)",
                }}
              />
              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  mb: 2,
                  background: "#f7fafc",
                  borderRadius: 2,
                  boxShadow: "0 1px 4px 0 rgba(21,101,192,0.06)",
                }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 10 }}
                sx={{
                  mb: 3,
                  background: "#f7fafc",
                  borderRadius: 2,
                  boxShadow: "0 1px 4px 0 rgba(21,101,192,0.06)",
                }}
              />
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!id.trim() || !name.trim() || !phone.trim() || loading}
                  endIcon={loading ? <CircularProgress size={20} /> : <PersonAddAlt1Icon />}
                  sx={{
                    px: 3,
                    fontWeight: 700,
                    border: "2px solid #1976d2",
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
                  Continue
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Fade>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
