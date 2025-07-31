import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Stack, Divider } from "@mui/material";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizData, answers, score } = location.state || {};

  // Handle case where state is missing
  if (!quizData || !answers) {
    return (
      <Box sx={{ p: 4, color: "#fff", backgroundColor: "#1a1a2e", textAlign: "center" }}>
        <Typography color="error">No result data available. Please try the quiz again.</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ mt: 2, background: "linear-gradient(45deg, #00f0ff, #ff4ecd)" }}
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  const totalQuestions = quizData.questions.length;
  const percentage = ((score / totalQuestions) * 100).toFixed(1);

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
          sx={{ mb: 3, color: "#00f0ff", fontWeight: "bold", fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
        >
          Quiz Results: {quizData.title}
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
            sx={{ mb: 1, fontWeight: "medium", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Summary
          </Typography>
          <Typography sx={{ color: "#aaa", mb: 1 }}>
            Score: {score} out of {totalQuestions} ({percentage}%)
          </Typography>
          <Typography sx={{ color: score >= totalQuestions * 0.7 ? "#00f0ff" : "#ff4ecd" }}>
            Status: {score >= totalQuestions * 0.7 ? "Passed" : "Failed"} (70% required to pass)
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Typography
          variant="h6"
          sx={{ mb: 2, color: "#ddd", fontWeight: "medium", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
        >
          Question Review
        </Typography>
        {quizData.questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.correctAnswer;
          return (
            <Box
              key={index}
              sx={{
                mb: 2,
                p: 2,
                backgroundColor: isCorrect ? "rgba(0, 240, 255, 0.1)" : "rgba(255, 78, 205, 0.1)",
                borderRadius: 1,
                borderLeft: `3px solid ${isCorrect ? "#00f0ff" : "#ff4ecd"}`,
              }}
            >
              <Typography sx={{ mb: 1, color: "#ddd" }}>
                {index + 1}. {question.question}
              </Typography>
              <Typography sx={{ mb: 1, color: isCorrect ? "#00f0ff" : "#ff4ecd" }}>
                Your Answer: {userAnswer || "Not answered"}
              </Typography>
              <Typography sx={{ color: "#aaa" }}>
                Correct Answer: {question.correctAnswer}
              </Typography>
            </Box>
          );
        })}

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4, width: "100%" }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate("/")}
            sx={{
              color: "#aaa",
              borderColor: "rgba(255, 255, 255, 0.2)",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              "&:hover": { borderColor: "#00f0ff" },
            }}
          >
            Return to Home
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/quiz-start", { state: { quiz: quizData } })}
            sx={{
              background: "linear-gradient(45deg, #00f0ff, #ff4ecd)",
              fontSize: { xs: "0.875rem", sm: "1rem" },
              py: { xs: 1, sm: 1.5 },
              "&:hover": { background: "linear-gradient(45deg, #00d0e0, #ff30bd)" },
            }}
          >
            Retry Quiz
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}