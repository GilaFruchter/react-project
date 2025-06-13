import React, { useEffect, useState } from "react";
import {
  Box, Paper, Typography, FormControl, InputLabel, Select, MenuItem,
  TextField, Button, CircularProgress, Alert, Stack, Fade, IconButton
} from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import SendIcon from "@mui/icons-material/Send";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories, getAllsubCategoriesById, addPromptAsync } from "/src/Redux/thunk.js";
import { useNavigate, useParams } from "react-router-dom";

const CheckCategory = () => {
  const { name, id } = useParams(); // id from URL, always exists
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
          userId: id, // use id from URL!
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
          background: "#f7fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: { xs: 2, sm: 4 },
            width: { xs: "98vw", sm: 400, md: 430 },
            maxWidth: "98vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            borderRadius: 4,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ alignSelf: "flex-end" }}>
            <IconButton
              onClick={() => {
                navigate(`/LearningHistory/${id}`); // always use id from URL!
              }}
            >
              <HistoryIcon />
            </IconButton>
          </Stack>
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
              borderRadius: 2,
            }}
          >
            Get Lesson
          </Button>
          <Box
            sx={{
              width: "100%",
              minHeight: 80,
              mt: 2,
              p: 2,
              borderRadius: 2,
              border: "1px solid #e3e8ee",
              display: aiResponse ? "block" : "none",
            }}
          >
            {aiResponse && (
              <Typography variant="body1" color="primary" sx={{ whiteSpace: "pre-line" }}>
                {aiResponse}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Fade>
  );
};

export default CheckCategory;
