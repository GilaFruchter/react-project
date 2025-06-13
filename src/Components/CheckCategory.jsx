import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, CircularProgress, Alert, Stack, Fade, IconButton,
  createTheme, ThemeProvider, CssBaseline
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, getAllsubCategoriesById, addPromptAsync } from "/src/Redux/thunk.js";
import { useNavigate, useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#546E7A',
      light: '#819CA9',
      dark: '#263238',
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
    },
    background: {
      default: '#ECEFF1',
      paper: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: 'Heebo, sans-serif',
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
      <Fade in timeout={700}>
        <Box
          sx={{
            minHeight: "100vh",
            background: 'linear-gradient(135deg, #F0F2F5 0%, #E0E3E8 100%)',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 3 },
          }}
        >
          <Paper
            elevation={0}
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
        </Box>
      </Fade>
    </ThemeProvider>
  );
};

export default CheckCategory;