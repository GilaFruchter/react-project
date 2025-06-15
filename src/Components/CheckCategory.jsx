import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, CircularProgress, Alert, Stack, Fade, IconButton,
  createTheme, ThemeProvider, CssBaseline,
  AppBar, // ייבוא AppBar
  Toolbar, // ייבוא Toolbar
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import SchoolIcon from "@mui/icons-material/School"; // ייבוא SchoolIcon
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, getAllsubCategoriesById, addPromptAsync } from "/src/Redux/thunk.js";
import { useNavigate, useParams } from "react-router-dom";

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
      appBar: '#546E7A', // הגדרת צבע כחול (primary.main) לטקסט בסרגל הניווט
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
    h6: {
      fontWeight: 700,
      fontSize: '1.6rem',
      color: '#37474F',
    },
    h5: { // הוספת סגנון H5 ספציפי עבור טקסט הכותרת ב-AppBar
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '1.2rem',
      },
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
  },
  components: {
    MuiPaper: {
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
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#FBFDFF',
          borderRadius: 12,
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: '#E0E0E0',
              transition: 'border-color 0.2s ease-in-out',
            },
            '&:hover fieldset': {
              borderColor: '#B0BEC5',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#546E7A',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#FBFDFF',
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 12,
            borderColor: '#E0E0E0',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#B0BEC5',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#546E7A',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 700,
          fontSize: '1.1rem',
          padding: '12px 25px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          },
        },
        containedPrimary: {
          backgroundColor: '#546E7A',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#607D8B',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#78909C',
          '&:hover': {
            color: '#546E7A',
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.95rem',
        },
      },
    },
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
  },
});

const CheckCategory = () => {
  const { name, id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoriesList = useSelector((state) => state.category.categories);
  const subsCategoryList = useSelector((state) => state.subCategory.subsCategories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getAllsubCategoriesById(selectedCategory));
      setSelectedSubCategory("");
    }
  }, [selectedCategory, dispatch]);

  const categories =
    categoriesList && categoriesList.length > 0
      ? categoriesList.map((cat) => ({
          id: cat.id,
          name: cat.name,
        }))
      : [];

  const subsCategoryData =
    subsCategoryList && subsCategoryList.length > 0 && selectedCategory
      ? subsCategoryList
          .filter((sub) => sub.categoryId === Number(selectedCategory))
          .map((sub) => ({
            id: sub.id,
            name: sub.name,
          }))
      : [];

  const handleSubmitPrompt = async () => {
    setError("");
    setAiResponse("");
    if (!selectedCategory || !selectedSubCategory || !prompt) {
      setError("Please select a category, sub-category, and enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const resultAction = await dispatch(
        addPromptAsync({
          userId: id,
          categoryId: Number(selectedCategory),
          subCategoryId: Number(selectedSubCategory),
          prompt1: prompt,
        })
      );
      if (addPromptAsync.fulfilled.match(resultAction)) {
        setAiResponse(resultAction.payload.response || "No response from AI.");
      } else {
        setError("Failed to get AI response.");
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box // ה-Box הראשי מכיל עכשיו את ה-AppBar ואת התוכן המרכזי
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
            pt: '80px', // דוחף את התוכן למטה בגובה ה-AppBar
            pb: 6, // שומר על הריפוד התחתון המקורי
            px: 2, // שומר על הריפוד האופקי המקורי
          }}
        >
          <Fade in timeout={700}>
            <Paper
              elevation={0} // נשמר מהקוד המקורי שלך
              sx={{
                p: { xs: 3, sm: 5 },
                width: { xs: "95vw", sm: 480, md: 520 },
                maxWidth: "98vw",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2.5,
                position: 'relative',
              }}
            >
              <IconButton
                onClick={() => navigate(`/LearningHistory/${id}`)}
                sx={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  fontSize: 30,
                  p: 1,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  '&:hover': {
                    backgroundColor: 'rgba(0,0,0,0.06)',
                  },
                }}
              >
                <HistoryIcon fontSize="inherit" />
              </IconButton>

              <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Hi {name}, let's start learning!
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Select a category, sub-category, and enter your learning prompt.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ width: "100%", mb: 1, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <FormControl fullWidth sx={{ mb: 1 }}>

                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 1 }}>
                <InputLabel id="sub-category-label">Sub-Category</InputLabel>
                <Select
                  labelId="sub-category-label"
                  value={selectedSubCategory}
                  label="Sub-Category"
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
                  disabled={!selectedCategory}
                >
                  {subsCategoryData.map((sub) => (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Your Prompt"
                variant="outlined"
                fullWidth
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                multiline
                minRows={3}
                placeholder="e.g., Explain quantum physics for beginners..."
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                color="primary"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                onClick={handleSubmitPrompt}
                disabled={loading}
                fullWidth
              >
                Get Lesson
              </Button>

              <Fade in={!!aiResponse} timeout={500}>
                <Box
                  sx={{
                    width: "100%",
                    minHeight: aiResponse ? 100 : 0,
                    mt: 2,
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid #E0E0E0",
                    backgroundColor: '#FDFEFE',
                    display: aiResponse ? "block" : "none",
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                    {aiResponse}
                  </Typography>
                </Box>
              </Fade>
            </Paper>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CheckCategory;
