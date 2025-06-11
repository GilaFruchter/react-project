import React from "react";
import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          minWidth: { xs: 320, md: 400 },
          maxWidth: 500,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          ברוך הבא!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          זהו עמוד הבית של האפליקציה שלך. בחר פעולה להתחלה:
        </Typography>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate("/LogIn")}
          >
            התחברות
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={() => navigate("/history")}
          >
            היסטוריית למידה
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Home;