import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPromptById } from "../Redux/thunk";
import { useParams, useNavigate } from "react-router-dom"; // ייבוא useNavigate
import {
  CircularProgress,
  Alert,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
  Divider,
  AppBar, // ייבוא AppBar
  Toolbar, // ייבוא Toolbar
  CssBaseline, // ייבוא CssBaseline
  createTheme, // ייבוא createTheme
  ThemeProvider, // ייבוא ThemeProvider
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School"; // ייבוא SchoolIcon

// הגדרת נושא (Theme) עבור הקומפוננטה
const theme = createTheme({
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
      appBar: '#546E7A', // צבע כחול (primary.main) לטקסט בסרגל הניווט
    },
    background: {
      default: '#ECEFF1',
      paper: '#FFFFFF',
      appBar: 'rgba(0,0,0,0.05)', // רקע שקוף עבור סרגל הניווט
      appBarBlur: '5px', // טשטוש לרקע סרגל הניווט
    },
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
    h4: { // הוספת h4 כי הוא בשימוש ב-LearningHistory
      fontWeight: 700,
      fontSize: '2.2rem',
      '@media (max-width:600px)': {
        fontSize: '1.8rem',
      },
      color: '#37474F',
    },
    h5: { // סגנון H5 ספציפי עבור טקסט הכותרת ב-AppBar
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
    body2: { // הוספת body2 כי הוא בשימוש ב-LearningHistory
      fontSize: '0.875rem',
      lineHeight: 1.4,
      color: '#607D8B',
    }
  },
  components: {
    MuiAppBar: { // סגנונות AppBar
      styleOverrides: {
        root: {
          background: 'transparent', // רקע שקוף
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // צל עדין
        },
      },
    },
    MuiToolbar: { // סגנונות Toolbar
      styleOverrides: {
        root: {
          padding: '15px 30px',
          '@media (max-width:600px)': {
            padding: '10px 20px',
          },
        },
      },
    },
    MuiPaper: { // סגנונות Paper כלליים
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
    MuiList: { // סגנונות לרשימה
      styleOverrides: {
        root: {
          borderRadius: 12, // פינות עגולות לרשימה
          border: '1px solid #ECEFF1', // גבול עדין
        }
      }
    },
    MuiListItem: { // סגנונות לפריט ברשימה
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '&:nth-of-type(odd)': { // רקע שונה לשורות אי-זוגיות
            backgroundColor: '#F9FBFB',
          },
          '&:hover': {
            backgroundColor: '#F0F4F8', // שינוי רקע בריחוף
          }
        }
      }
    },
    MuiDivider: { // סגנונות למפריד
      styleOverrides: {
        root: {
          margin: '0px 0',
          borderColor: '#CFD8DC', // צבע גבול המפריד
        }
      }
    }
  },
});

const LearningHistory = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate(); // ייבוא useNavigate

  const { prompts, loading, error } = useSelector((state) => state.prompt);

  useEffect(() => {
    if (id) {
      dispatch(GetPromptById(id));
    }
  }, [dispatch, id]);

  return (
    <ThemeProvider theme={theme}> {/* עוטף ב-ThemeProvider */}
      <CssBaseline /> {/* איפוס סגנונות CSS בסיסיים */}
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          position: 'fixed', // מיקום קבוע על כל מסך התצוגה
          top: 0,
          left: 0,
          background: theme => `linear-gradient(135deg, ${theme.palette.background.default} 0%, #F5F5F5 100%)`,
          display: "flex",
          flexDirection: 'column', // אלמנטים מוערמים אנכית
          alignItems: "center", // מרכז אופקית את האלמנטים הילדים (AppBar וה-Box של התוכן)
          justifyContent: "flex-start", // התחל את התוכן מהחלק העליון
          p: 0, // הסר ריפוד מה-Box הראשי, ה-Box הפנימי יטפל בו
          overflowY: 'auto', // אפשר גלילה אנכית במידת הצורך
        }}
      >
        {/* הוספת AppBar */}
        <AppBar position="fixed" sx={{ // שימוש ב-fixed כדי שיישאר קבוע למעלה
          background: theme.palette.background.appBar,
          backdropFilter: `blur(${theme.palette.background.appBarBlur})`,
          width: '100%',
          top: 0,
          left: 0,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // צל קטן
        }}>
          <Toolbar>
            <SchoolIcon sx={{ fontSize: 40, color: theme.palette.primary.main, mr: 2 }} />
            <Typography variant="h5" color="text.appBar" sx={{ flexGrow: 1, fontWeight: 500 }}>
              AI Learning Platform
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Box זה מכיל כעת את התוכן הראשי ומטפל במרכוז האנכי שלו מתחת ל-AppBar */}
        <Box
          sx={{
            flexGrow: 1, // תופס את כל השטח האנכי הפנוי
            display: 'flex',
            alignItems: 'center', // מרכז את ה-Paper אופקית
            justifyContent: 'center', // מרכז את ה-Paper אנכית בתוך השטח שלו
            width: '100%',
            pt: '80px', // דוחף את התוכן למטה בגובה ה-AppBar (בהתאם לגובה שלו)
            pb: 6, // שומר על הריפוד התחתון המקורי
            px: 2, // שומר על הריפוד האופקי המקורי
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              maxWidth: 700,
              margin: "auto", // מרכז אוטומטית בתוך ה-Box
              borderRadius: 2,
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
              width: '100%', // כדי למלא את ה-maxWidth
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              align="center"
              gutterBottom
              sx={{ mb: 3, color: "primary.main", fontWeight: 700 }}
            >
              היסטוריית למידה
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              עבור משתמש:{" "}
              <Box component="span" sx={{ fontWeight: "bold", color: "text.primary" }}>
                {id}
              </Box>
            </Typography>

            <Divider sx={{ mb: 4 }} />

            {loading && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: 200,
                }}
              >
                <CircularProgress size={50} sx={{ mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  טוען היסטוריה... אנא המתן.
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, py: 2 }}>
                <Typography variant="body1" component="div">
                  אירעה שגיאה בטעינת היסטוריית הלמידה:
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  sx={{ mt: 1, fontWeight: "bold" }}
                >
                  {error}
                </Typography>
              </Alert>
            )}

            {!loading && !error && (
              <List sx={{ bgcolor: "background.paper", borderRadius: 1 }}>
                {prompts && prompts.length > 0 ? (
                  prompts.map((promptItem, index) => (
                    <React.Fragment key={promptItem.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemText
                          primary={
                            <Typography
                              component="span"
                              variant="subtitle1"
                              color="text.primary"
                              sx={{ fontWeight: "bold" }}
                            >
                              שאלה: {promptItem.prompt}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              sx={{ display: "block", mt: 1 }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              תשובה: {promptItem.response}
                            </Typography>
                          }
                        />
                      </ListItem>
                      {index < prompts.length - 1 && (
                        <Divider component="li" variant="inset" sx={{ ml: 0 }} />
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <Alert severity="info" sx={{ mt: 2, py: 2 }}>
                    <Typography variant="body1" component="div">
                      אין היסטוריית למידה זמינה עבור משתמש זה כרגע.
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ mt: 1 }}>
                      התחל לשאול שאלות כדי לראות את ההיסטוריה כאן!
                    </Typography>
                  </Alert>
                )}
              </List>
            )}
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LearningHistory;
