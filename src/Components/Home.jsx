import React from "react";
import { 
  Button, 
  Typography, 
  Stack, 
  AppBar, 
  Toolbar, 
  Box, 
  createTheme, 
  ThemeProvider, 
  CssBaseline 
} from "@mui/material"; 
import LockOpenIcon from "@mui/icons-material/LockOpen"; 
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"; 
import SchoolIcon from "@mui/icons-material/School"; 
import { useNavigate } from "react-router-dom"; 

const theme = createTheme({ 
  direction: "ltr", 
  palette: { 
    primary: { 
      main: '#4db6ac', // Teal
      dark: '#00897b',
    }, 
    secondary: { 
      main: '#7986cb', // Indigo
      light: '#9fa8da',
    }, 
    text: { 
      primary: '#ffffff', // White
      secondary: '#cfd8dc', // Light grey for subtle text
    }, 
    background: { 
      default: '#263238', // Dark blue-grey (Deep Space)
      paper: '#37474F', // Slightly lighter for elements (Dark Slate)
      accent: '#546E7A', // Blue-grey (Requested color)
    }, 
  }, 
  typography: { 
    fontFamily: 'Heebo, sans-serif', 
    h3: { 
      fontWeight: 700, 
      fontSize: '3.8rem', 
      letterSpacing: -1.5, 
      lineHeight: 1.1,
      '@media (max-width:960px)': { 
        fontSize: '3rem',
      },
      '@media (max-width:600px)': { 
        fontSize: '2.5rem', 
      }, 
    }, 
    h5: { 
      fontWeight: 400, 
      fontSize: '1.5rem', 
      lineHeight: 1.6, 
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
    }, 
  }, 
  components: { 
    MuiButton: { 
      styleOverrides: { 
        root: { 
          borderRadius: 30, 
          padding: '14px 36px', 
          fontWeight: 600, 
          fontSize: '1.15rem', 
          textTransform: 'none', 
          transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
          '&:hover': { 
            transform: 'scale(1.03) translateY(-2px)', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.3)', 
          }, 
        }, 
        containedPrimary: {
          backgroundColor: '#4db6ac',
          '&:hover': {
            backgroundColor: '#00897b',
          },
        },
        outlinedSecondary: { 
            borderColor: '#7986cb', 
            color: '#7986cb', 
            '&:hover': {
                backgroundColor: 'rgba(121, 134, 203, 0.1)', 
                borderColor: '#7986cb',
            },
        }
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

const Home = () => { 
  const navigate = useNavigate(); 

  return ( 
    <ThemeProvider theme={theme}> 
      <CssBaseline /> 
      <Box 
        sx={{ 
          minHeight: '100vh', 
          width: '100vw', 
          position: 'fixed', 
          top: 0,
          left: 0,
          background: `
            linear-gradient(160deg, ${theme.palette.background.default} 0%, ${theme.palette.background.accent} 70%, #607D8B 100%),
            radial-gradient(circle at 15% 85%, rgba(77, 182, 172, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 85% 15%, rgba(121, 134, 203, 0.15) 0%, transparent 50%)
          `, 
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
          display: 'flex', 
          flexDirection: 'column', 
          overflow: 'hidden', 
        }}
      > 
        <AppBar position="static" sx={{ background: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(5px)' }}> 
          <Toolbar> 
            <SchoolIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mr: 2 }} /> 
            <Typography variant="h5" color="text.primary" sx={{ flexGrow: 1, fontWeight: 500 }}> 
              AI Learning Platform 
            </Typography> 
          </Toolbar> 
        </AppBar> 

        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            textAlign: 'center', 
            px: { xs: 3, md: 8 }, 
            py: { xs: 6, md: 10 }, 
            color: 'white', 
            background: 'transparent', 
            maxWidth: '900px', 
            margin: '0 auto', 
          }} 
        > 
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              color: theme.palette.text.primary, 
              textShadow: '0 2px 8px rgba(0,0,0,0.4)', 
              animation: 'fadeInUp 1.5s ease-out', 
              '@keyframes fadeInUp': { 
                'from': { opacity: 0, transform: 'translateY(40px)' }, 
                'to': { opacity: 1, transform: 'translateY(0)' }, 
              }, 
            }} 
          > 
            Welcome to <br /> the AI Learning Platform 
          </Typography> 

          <Typography variant="h5" sx={{ mb: 5, maxWidth: 650, color: theme.palette.text.secondary }}> 
            Personalized learning powered by AI – accessible, engaging, and tailored for your success. 
          </Typography> 

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ width: '100%', justifyContent: 'center' }}> 
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<LockOpenIcon />} 
              onClick={() => navigate("/login")} 
            > 
              Login 
            </Button> 
            <Button 
              variant="outlined" 
              color="secondary" 
              startIcon={<AdminPanelSettingsIcon />} 
              onClick={() => navigate("/AdminDashboard")} 
              sx={{ 
                borderColor: theme.palette.secondary.main, 
                color: theme.palette.secondary.main, 
                '&:hover': { 
                  backgroundColor: 'rgba(121, 134, 203, 0.1)', 
                  borderColor: theme.palette.secondary.light, 
                  color: theme.palette.secondary.light, 
                }, 
              }} 
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
