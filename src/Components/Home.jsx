import React from "react";
import { Button, Typography, Stack, AppBar, Toolbar, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <SchoolIcon color="primary" sx={{ fontSize: 36, mr: 1 }} />
          <Typography
            variant="h4"
            color="primary"
            sx={{ flexGrow: 1, fontWeight: 700 }}
          >
            AI Learning Platform
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          color="primary"
          fontWeight={700}
          gutterBottom
          sx={{
            mb: 5,
            letterSpacing: 1,
            textAlign: "center",
            fontSize: { xs: 28, sm: 38 },
          }}
        >
          Welcome!
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<LockOpenIcon />}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: 20,
              borderRadius: 3,
              boxShadow: "0 2px 8px 0 rgba(25, 118, 210, 0.08)",
              textTransform: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<AdminPanelSettingsIcon />}
            sx={{
              px: 5,
              py: 1.5,
              fontWeight: 600,
              fontSize: 20,
              borderRadius: 3,
              textTransform: "none",
              borderWidth: 2,
            }}
            onClick={() => navigate("/AdminDashboard")}
          >
            Admin
          </Button>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Home;