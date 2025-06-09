import React from "react";
import { Button, Typography, Stack } from "@mui/material";

const actions = [
  { label: "Register User" },
  { label: "Choose Category" },
  { label: "Submit Prompt" },
  { label: "View AI Response" },
  { label: "Learning History" },
  { label: "Admin Panel" },
];

const Home = () => {
  return (
    <div
      style={{
        marginTop: 170,
        minHeight: "100vh",
        // background: "linear-gradient(135deg, #e3e6f3 0%, #f9fafc 100%)",
        padding: "60px 0 0 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight={700}
        sx={{
          color: "#2d3142",
          letterSpacing: 1,
          mb: 4,
        }}
      >
        Dashboard
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{ width: "100%", mt: 2 }}
      >
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="contained"
            disableElevation
            sx={{
              background: "linear-gradient(90deg, #232526 0%, #414345 100%)",
              color: "#fff",
              fontWeight: 500,
              fontSize: "1rem",
              borderRadius: 2,
              px: 3,
              py: 1,
              minWidth: 140,
              boxShadow: "none",
              textTransform: "none",
              letterSpacing: 0.5,
              '&:hover': {
                background: "linear-gradient(90deg, #414345 0%, #232526 100%)",
                boxShadow: "none",
              },
              transition: "background 0.3s",
            }}
          >
            {action.label}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default Home;
