import { Box, Typography, Button, Chip, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ChallengeWelcome() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz } = location.state || {};

  // Debug: Log quiz data to verify it's being received
  useEffect(() => {
    console.log("Quiz data in ChallengeWelcome:", quiz);
  }, [quiz]);

  // Redirect to home if no quiz data is available
  useEffect(() => {
    if (!quiz) {
      console.warn("No quiz data found, redirecting to home.");
      navigate("/");
    }
  }, [quiz, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1a1a2e",
        p: { xs: 2, sm: 4, md: 6 },
        color: "#fff",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: "100%", sm: "600px", md: "800px" },
          width: "100%",
          p: { xs: 3, sm: 4, md: 5 },
          backgroundColor: "rgba(26, 26, 46, 0.95)",
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 3,
            color: "#00f0ff",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Welcome back, User
        </Typography>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            backgroundColor: "rgba(0, 240, 255, 0.05)",
            borderRadius: 1,
            borderLeft: "3px solid #00f0ff",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: "medium",
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
            }}
          >
            {quiz?.title || "No Quiz Selected"}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#aaa",
              mb: 2,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
          >
            {quiz?.description || "No description available"}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={quiz?.category || "Unknown"}
              size="small"
              sx={{
                backgroundColor: "#00f0ff20",
                color: "#00f0ff",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            />
            <Chip
              label={quiz?.difficulty || "Unknown"}
              size="small"
              sx={{
                backgroundColor: "#ff4ecd20",
                color: "#ff4ecd",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
              }}
            />
          </Stack>
        </Box>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 3,
            color: "#ddd",
            fontWeight: "medium",
            fontSize: { xs: "1rem", sm: "1.25rem" },
          }}
        >
          Challenge Parameters
        </Typography>

        <Box
          sx={{
            mb: 5,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <ParameterItem icon="⏱️" title={`5 Questions`} />
          <ParameterItem icon="🕒" title={`15 Minutes`} />
          <ParameterItem icon="❓" title="Multiple Choice" />
          <ParameterItem icon="↔️" title="Navigate Between Questions" />
        </Box>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/form", { state: { quiz } })}
            sx={{
              color: "#aaa",
              borderColor: "rgba(255, 255, 255, 0.2)",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              "&:hover": {
                borderColor: "#00f0ff",
              },
            }}
          >
            Edit Info
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              console.log("Starting quiz:", quiz);
              navigate("/quiz", { state: { quiz } });
            }}
            sx={{
              background: "linear-gradient(45deg, #00f0ff, #ff4ecd)",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              "&:hover": {
                background: "linear-gradient(45deg, #00d0e0, #ff30bd)",
              },
            }}
          >
            Begin Challenge
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

function ParameterItem({ icon, title }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 1, sm: 1.5 },
        p: { xs: 1, sm: 1.5 },
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderRadius: 1,
      }}
    >
      <Typography sx={{ fontSize: { xs: "1rem", sm: "1.2rem" } }}>{icon}</Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#ddd",
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}