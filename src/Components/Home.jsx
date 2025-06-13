import React from "react";
import { Button, Typography, Stack, AppBar, Toolbar, Box, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#607D8B', // אפור-כחול עדין
      light: '#90A4AE',
      dark: '#455A64',
    },
    secondary: {
      main: '#81C784', // ירוק בהיר ומרגיע
      light: '#A5D6A7',
      dark: '#66BB6A',
    },
    text: {
      primary: '#424242', // אפור כהה רך לטקסט ראשי
      secondary: '#757575', // אפור בינוני לטקסט משני
    },
    background: {
      default: '#ECEFF1', // אפור בהיר מאוד (כמעט לבן)
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
    h3: {
      fontWeight: 700, // מעט פחות דומיננטי
      fontSize: '3.5rem',
      letterSpacing: -1, // פחות דחיס
      lineHeight: 1.2,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.6rem',
      },
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1rem',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10, // מעט פחות עגול
          textTransform: "none",
          fontWeight: 600, // פחות בולד
          fontSize: '1.2rem',
          padding: '12px 35px', // ריווח פנימי מעט פחות
          transition: 'all 0.2s ease-in-out', // מעבר מהיר יותר
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)', // צל קבוע עדין מאוד
          '&:hover': {
            transform: 'translateY(-2px)', // אפקט ריחוף עדין יותר
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)', // צל מעט בולט בריחוף
          },
        },
        containedPrimary: {
          backgroundColor: '#607D8B', // צבע אחיד רך יותר
          color: '#fff',
          '&:hover': {
            backgroundColor: '#78909C', // גוון מעט בהיר יותר במעבר
          },
        },
        outlinedPrimary: {
          borderColor: '#607D8B',
          color: '#607D8B',
          borderWidth: 1, // מסגרת דקה יותר
          '&:hover': {
            backgroundColor: 'rgba(96, 125, 139, 0.05)', // רקע שקוף יותר במעבר
            borderColor: '#607D8B',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.9)', // שקיפות עדינה
          backdropFilter: 'blur(6px)', // טשטוש עדין
          boxShadow: '0 1px 8px rgba(0, 0, 0, 0.03)', // צל קל מאוד
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          paddingLeft: '28px',
          paddingRight: '28px',
          '@media (max-width:600px)': {
            paddingLeft: '18px',
            paddingRight: '18px',
          },
        },
      },
    },
  },
});

const Home = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          background: 'linear-gradient(135deg, #F9FBE7 0%, #E8F5E9 100%)', // גרדיאנט פסטלי עדין מאוד
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar position="sticky" color="transparent" elevation={0} sx={{ top: 0, zIndex: 1100 }}>
          <Toolbar>
            <SchoolIcon color="primary" sx={{ fontSize: 40, mr: 1.5 }} />
            <Typography
              variant="h5" // הקטנתי מעט את כותרת הלוגו
              color="primary"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              AI Learning Platform
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 3, sm: 5 },
            width: '100%',
            maxWidth: 700, // צמצום רוחב מרבי לתוכן המרכזי
            margin: '0 auto',
          }}
        >
          <Typography
            variant="h3"
            color="text.primary"
            fontWeight={700}
            gutterBottom
            sx={{
              mb: 5, // ריווח תחתון סטנדרטי יותר
              letterSpacing: -1,
              textAlign: "center",
              textShadow: '1px 1px 3px rgba(0,0,0,0.03)', // צל טקסט עדין מאוד
            }}
          >
            Welcome to the <br /> **AI Learning Platform**
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={4}> {/* ריווח מעט קטן יותר */}
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<LockOpenIcon />}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<AdminPanelSettingsIcon />}
              onClick={() => navigate("/AdminDashboard")}
            >
              Admin
            </Button>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;