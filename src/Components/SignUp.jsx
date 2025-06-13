import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Stack,
  Avatar,
  Paper
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewUser } from '../Redux/thunk';

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

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    if (!id || !firstName.trim() || !phone.trim()) {
      setMessage('יש למלא את כל השדות');
      return;
    }
    const customerData = {
      id: isNaN(Number(id)) ? id : Number(id),
      name: firstName,
      phone: phone,
    };
    try {
      const resultAction = await dispatch(createNewUser(customerData));
      if (createNewUser.fulfilled.match(resultAction)) {
        setMessage('נרשמת בהצלחה!');
        await new Promise(res => setTimeout(res, 1000));
        navigate(`/CheckCategory/${firstName.trim()}/${id}`);
      } else {
        setMessage('הרשמה נכשלה: ' + (resultAction.error?.message || ''));
      }
    } catch (error) {
      setMessage('שגיאה: ' + error.message);
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
            <PersonAddAlt1Icon fontSize="large" />
          </Avatar>
          <Typography variant="h4" color="primary" fontWeight={700} gutterBottom>
            הרשמה
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            מלא את פרטיך להרשמה
          </Typography>
          {message && (
            <Typography variant="body2" color={message.includes('הצלחה') ? "success.main" : "error"} align="center" mb={2}>
              {message}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <TextField
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              value={id || ''}
              InputProps={{ readOnly: true }}
              sx={{ mb: 3, background: "#f7fafc", borderRadius: 2 }}
            />
            <TextField
              label="שם פרטי"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              sx={{ mb: 3, background: "#f7fafc", borderRadius: 2 }}
              required
            />
            <TextField
              label="מספר טלפון"
              variant="outlined"
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 3, background: "#f7fafc", borderRadius: 2 }}
              required
            />
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<SendIcon />}
                disabled={!firstName.trim() || !phone.trim()}
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
                הרשמה
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default SignUp;
