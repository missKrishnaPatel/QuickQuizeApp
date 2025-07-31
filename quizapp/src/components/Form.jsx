import { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Divider, MenuItem } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function JoinArenaForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quiz } = location.state || {}; // Retrieve quiz data from state

  // State to manage form inputs
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    experienceLevel: "",
    motivation: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Basic validation before submission
      if (!formData.fullName || !formData.email || !formData.experienceLevel) {
        alert("Please fill in all required fields (Full Name, Email, Experience Level).");
        return;
      }

      const response = await fetch("http://localhost:5000/api/join-arena", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Form data saved successfully!");
        if (quiz) {
          navigate("/quiz-start", { state: { quiz } }); // Navigate to quiz-start route with quiz data
        } else {
          alert("No quiz data available for navigation.");
          navigate("/"); // Fallback to home if no quiz data
        }
      } else {
        alert("Failed to save form data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while saving the form data.");
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        width: "100vw", // Full viewport width
        height: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212", // Dark black background
        p: 1, // Reduced padding
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px", // Keep maxWidth for readability
          p: 2, // Reduced padding
          border: "1px solid #2a2a2a",
          borderRadius: 2,
          backgroundColor: "#1a1a1a", // Darker form background
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#00f0ff", mb: 1 }}
        >
          Join the Arena
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: "#ccc" }}>
          Challenge: <span style={{ color: "#ff4ecd" }}>{quiz?.title || "No Quiz Selected"}</span>
        </Typography>

        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#ddd" }}>
              Full Name *
            </Typography>
            <TextField
              fullWidth
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "#2a2a2a" },
                  "&:hover fieldset": { borderColor: "#00f0ff" },
                },
                "& .MuiInputBase-input": { padding: "8px" },
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#ddd" }}>
              Email Address *
            </Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "#2a2a2a" },
                  "&:hover fieldset": { borderColor: "#00f0ff" },
                },
                "& .MuiInputBase-input": { padding: "8px" },
              }}
            />
          </Box>

          <Stack direction="row" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#ddd" }}>
                Location
              </Typography>
              <TextField
                fullWidth
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country (optional)"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "#2a2a2a" },
                    "&:hover fieldset": { borderColor: "#00f0ff" },
                  },
                  "& .MuiInputBase-input": { padding: "8px" },
                }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#ddd" }}>
                Experience Level *
              </Typography>
              <TextField
                select
                fullWidth
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    color: "#fff",
                    "& fieldset": { borderColor: "#2a2a2a" },
                    "&:hover fieldset": { borderColor: "#00f0ff" },
                  },
                  "& .MuiInputBase-input": { padding: "8px" },
                }}
              >
                <MenuItem value="">Select your experience level</MenuItem>
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </TextField>
            </Box>
          </Stack>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 0.5, color: "#ddd" }}>
              What motivates you?
            </Typography>
            <TextField
              select
              fullWidth
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "#fff",
                  "& fieldset": { borderColor: "#2a2a2a" },
                  "&:hover fieldset": { borderColor: "#00f0ff" },
                },
                "& .MuiInputBase-input": { padding: "8px" },
              }}
            >
              <MenuItem value="">Choose your motivation (optional)</MenuItem>
              <MenuItem value="learning">Learning new skills</MenuItem>
              <MenuItem value="competition">Friendly competition</MenuItem>
              <MenuItem value="career">Career advancement</MenuItem>
            </TextField>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => setFormData({ fullName: "", email: "", location: "", experienceLevel: "", motivation: "" })}
            sx={{
              color: "#ccc",
              borderColor: "#2a2a2a",
              "&:hover": { borderColor: "#00f0ff", color: "#00f0ff" },
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{
              background: "linear-gradient(to right, #00f0ff, #ff4ecd)",
              "&:hover": { background: "linear-gradient(to right, #00d0e0, #ff30bd)" },
            }}
          >
            Insert
          </Button>
        </Stack>

        <Divider sx={{ my: 1, borderColor: "#2a2a2a" }} />

        <Typography variant="body2" sx={{ color: "#999", mb: 1 }}>
          Your information is secure and will only be used to personalize your quiz experience and track your progress in the arena.
        </Typography>

        <Button
          variant="text"
          sx={{
            color: "#00f0ff",
            textTransform: "none",
            "&:hover": { textDecoration: "underline" },
          }}
          onClick={handleBack}
        >
          ← Back to Arena
        </Button>
      </Box>
    </Box>
  );
}