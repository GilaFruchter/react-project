import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Stack } from "@mui/material";

const LogIn = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    phoneNum: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`ID: ${form.id}\nName: ${form.name}\nPhone: ${form.phoneNum}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3e6f3 0%, #f9fafc 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          minWidth: 320,
          maxWidth: 370,
          width: "100%",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={700} mb={3}>
          Log In
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="ID"
              name="id"
              value={form.id}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Phone Number"
              name="phoneNum"
              value={form.phoneNum}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontWeight: 600,
                py: 1.2,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: "none",
              }}
            >
              Log In
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default LogIn;