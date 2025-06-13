import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, CircularProgress, Alert, Stack, Fade, IconButton, Avatar
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import SchoolIcon from "@mui/icons-material/School";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, getAllsubCategoriesById, addPromptAsync } from "../Redux/thunk";
import { useNavigate, useParams } from "react-router-dom";

const CheckCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { name } = useParams();
  const user = useSelector((state) => state.user?.user);
  const userId = user?.id;
  const categoriesList = useSelector((state) => state.category.categories);
  const subsCategoryList = useSelector((state) => state.subCategory.subsCategories);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
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
    setAiResponse(null);
    if (!selectedCategory || !selectedSubCategory || !prompt) {
      setError("Please select a category, sub-category, and enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const resultAction = await dispatch(
        addPromptAsync({
          userId,
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
    <Fade in timeout={700}>
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
        <Paper
          elevation={8}
          sx={{
            p: { xs: 2, sm: 4 },
            width: { xs: "98vw", sm: 400, md: 430 },
            maxWidth: "98vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: 5,
            backdropFilter: "blur(2px)",
            boxShadow: "0 8px 32px 0 rgba(21,101,192,0.13)",
            background: "rgba(255,255,255,0.97)",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ alignSelf: "flex-end" }}>
            <IconButton color="primary" onClick={() => navigate("/LearningHistory")} title="Learning History">
              <HistoryIcon />
            </IconButton>
          </Stack>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              width: 48,
              height: 48,
              mb: 1,
              boxShadow: "0 4px 16px 0 rgba(21,101,192,0.18)",
            }}
          >
            <SchoolIcon fontSize="medium" />
          </Avatar>
          <Typography variant="h6" color="primary" fontWeight={700} gutterBottom>
            Hi {name}, let's start learning!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            Select a category, sub-category, and enter your learning prompt.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 1 }}>
              {error}
            </Alert>
          )}
          <FormControl fullWidth sx={{ mb: 2 }}>
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
          <FormControl fullWidth sx={{ mb: 2 }}>
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
            minRows={2}
            sx={{
              mb: 2,
              background: "#f7fafc",
              borderRadius: 2,
              boxShadow: "0 1px 4px 0 rgba(21,101,192,0.06)",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            onClick={handleSubmitPrompt}
            disabled={loading}
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
            Get Lesson
          </Button>
          {aiResponse && (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              <Typography variant="subtitle2" color="primary" fontWeight={700}>
                AI Response:
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
                {aiResponse}
              </Typography>
            </Alert>
          )}
        </Paper>
      </Box>
    </Fade>
  );
};

export default CheckCategory;
