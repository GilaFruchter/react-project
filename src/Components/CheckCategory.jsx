import React, { useState, useEffect } from "react";
import {
  Box, Typography, Paper, Stack, Button, CircularProgress, Alert, FormControl,
  InputLabel, Select, MenuItem, TextField
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getAllsubCategoriesById } from "../Redux/thunk";


const CheckCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const categoriesList = useSelector((state) => state.category.categories);
  const subsCategoryList = useSelector((state) => state.subCategory.subsCategories);

  console.log("categoriesList from Redux:", categoriesList);
  console.log("subsCategoryList from Redux:", subsCategoryList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getAllsubCategoriesById(selectedCategory));
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
    subsCategoryList && subsCategoryList.length > 0
      ? subsCategoryList.map((sub) => ({
        id: sub.id,
        name: sub.name,
      }))
      : [];

  const handleSubmitPrompt = async () => {
    if (!selectedCategory || !selectedSubCategory || !prompt) {
      setError("Please select a category, sub-category, and enter a prompt.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setAiResponse(null);

    try {
      const mockApiResponse = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            lesson: `This is a generated lesson about "${prompt}" in the category of ${categories.find((cat) => cat.id === selectedCategory)?.name
              } > ${subsCategoryData.find( // תיקון: subsCategoryData במקום subCategoriesData[selectedCategory]
                (sub) => sub.id === selectedSubCategory
              )?.name
              }.

            The AI provides detailed information, examples, and key takeaways for a comprehensive learning experience. For example, if you asked about 'black holes', the AI might cover:
            - What are black holes?
            - How do they form?
            - Types of black holes.
            - The event horizon.
            - Hawking radiation (theoretical).
            - Their impact on galaxies.

            This is a dummy response. In a real application, this would be a rich, educational text from a language model.`,
          });
        }, 2000)
      );
      setAiResponse(mockApiResponse.lesson);
    } catch (err) {
      setError("Failed to get AI response. Please try again.");
      console.error("Error submitting prompt:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          minWidth: { xs: "90%", sm: 450, md: 600 },
          maxWidth: 800,
          background: "#ffffff",
          boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.15)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          color="primary.main"
          gutterBottom
          align="center"
          sx={{ letterSpacing: 1, textShadow: "0 1px 2px rgba(0,0,0,0.05)" }}
        >
          AI Learning Dashboard
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          align="center"
          sx={{ mb: 2 }}
        >
          Choose a topic, ask a question, and let our AI teach you!
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack spacing={3} sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={(e) => {
                setSelectedCategory(Number(e.target.value));
                setSelectedSubCategory("");
              }}
              sx={{ borderRadius: 2 }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedCategory && (
            <FormControl fullWidth>
              <InputLabel id="sub-category-select-label">Sub-Category</InputLabel>
              <Select
                labelId="sub-category-select-label"
                id="sub-category-select"
                value={selectedSubCategory}
                label="Sub-Category"
                onChange={(e) => setSelectedSubCategory(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {subsCategoryData.map((subCat) => (
                  <MenuItem key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <TextField
            label="Enter your learning prompt"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ borderRadius: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={handleSubmitPrompt}
            disabled={isLoading || !selectedCategory || !selectedSubCategory || !prompt}
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "1.1rem",
              boxShadow: "0 4px 15px rgba(0, 123, 255, 0.2)",
              "&:hover": {
                boxShadow: "0 6px 20px rgba(0, 123, 255, 0.3)",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Get Lesson"
            )}
          </Button>
          {aiResponse && (
            <Box sx={{ mt: 3, width: "100%" }}>
              <Typography
                variant="h5"
                color="text.primary"
                gutterBottom
                sx={{ fontWeight: 600, mb: 2 }}
              >
                AI Generated Lesson:
              </Typography>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: "#f0f4f8",
                  minHeight: 150,
                  maxHeight: 400,
                  overflowY: "auto",
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  {aiResponse}
                </Typography>
              </Paper>
            </Box>
          )}
        </Stack>
      </Paper>
    </Box>
  );
};

export default CheckCategory;
