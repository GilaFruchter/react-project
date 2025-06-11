import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Avatar,
  Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserById } from '../Redux/thunk';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#6c757d' },
    background: { default: '#f4f8fb' },
  },
  typography: {
    fontFamily: 'Varela Round, Alef, sans-serif',
    h5: { fontWeight: 800 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px 0 rgba(25, 118, 210, 0.08)',
        },
      },
    },
  },
});

const LogIn = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(getUserById(password));
      if (getUserById.fulfilled.match(result)) {
        const user = result.payload;
        console.log("user from server:", user);
        const name = user?.name || user?.firstName || user?.Name || 'Guest';
        setMessage(`Welcome ${name}!`);
        await new Promise(res => setTimeout(res, 1000));
        navigate(`/CheckCategory/${name}`);
      } else {
        setMessage('Please sign up to continue.');
        navigate(`/SignUp/${password}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, sm: 5 },
            width: 370,
            maxWidth: "95vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 60, height: 60, mb: 1 }}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
            התחברות
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            insert user password to continue
          </Typography>
          {message && (
            <Typography variant="body2" color="error" align="center" mb={2}>
              {message}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              label="Id"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3, background: "#f7fafc", borderRadius: 2 }}
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/CheckCategory/guest')}
                sx={{
                  px: 3,
                  transition: "all 0.2s",
                  "&:hover": { background: "#e3f0ff", borderColor: "#1976d2" }
                }}
              >
                אורח
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!password.trim()}
                endIcon={<SendIcon />}
                sx={{
                  px: 3,
                  boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.10)",
                  border: "2px solid #1976d2",
                  transition: "all 0.2s",
                  "&:hover": { background: "#1565c0" },
                  "&.Mui-disabled": {
                    background: "#e3f0ff",
                    color: "#1976d2",
                    border: "2px solid #1976d2",
                    opacity: 0.7,
                  }
                }}
              >
                התחבר
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default LogIn;
