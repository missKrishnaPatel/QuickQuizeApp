import { useState, useEffect } from "react";
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz } = location.state || {};
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizData, setQuizData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // Timer in seconds
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    console.log("Received quiz data in QuizPage:", quiz); // Debug
    if (quiz?.title) {
      const normalizedTitle = quiz.title.trim();
      console.log("Fetching quiz with title:", normalizedTitle);
      fetch(`http://localhost:5000/api/quizzes/${encodeURIComponent(normalizedTitle)}`)
        .then((res) => {
          if (!res.ok) {
            if (res.status === 404) {
              throw new Error("Quiz not found. Please select a valid quiz.");
            }
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          console.log("Fetched quiz data:", data);
          if (!data.questions || data.questions.length < 5) {
            throw new Error("Insufficient questions in quiz data");
          }
          const selectedQuestions = data.questions.slice(0, 5);
          setQuizData({ ...data, questions: selectedQuestions });
          setTimeLeft(data.time * 60); // Convert minutes to seconds
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching quiz:", error);
          setError(error.message);
        });
    } else {
      console.error("No valid quiz title found:", quiz);
      setError("No valid quiz data provided.");
    }
  }, [quiz]);

  useEffect(() => {
    if (timeLeft > 0 && quizData) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && quizData) {
      showResults();
    }
  }, [timeLeft, quizData]);

  const handleAnswer = (event) => {
    setAnswers({ ...answers, [currentQuestion]: event.target.value });
  };

  const nextQuestion = () => {
    if (currentQuestion < 4) setCurrentQuestion(currentQuestion + 1);
    else showResults();
  };

  const showResults = () => {
    let score = 0;
    quizData.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) score++;
    });
    navigate("/result", { state: { quizData, answers, score } });
  };

  if (error) {
    return (
      <Box sx={{ p: 4, color: "#fff", backgroundColor: "#1a1a2e", textAlign: "center" }}>
        <Typography color="error">Error: {error}</Typography>
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

  if (!quizData) return <Box sx={{ p: 4, color: "#fff", backgroundColor: "#1a1a2e", textAlign: "center" }}><CircularProgress /></Box>;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

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
          {quizData.title}
        </Typography>
        <Box sx={{ mb: 4, p: { xs: 2, sm: 3 }, backgroundColor: "rgba(0, 240, 255, 0.05)", borderRadius: 1, borderLeft: "3px solid #00f0ff" }}>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "medium", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
            Question {currentQuestion + 1} of 5
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 2, fontSize: { xs: "0.875rem", sm: "1rem" } }}>
            Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </Typography>
        </Box>
        <Typography sx={{ mb: 2, color: "#ddd" }}>{quizData.questions[currentQuestion].question}</Typography>
        <RadioGroup value={answers[currentQuestion] || ""} onChange={handleAnswer} sx={{ mb: 3 }}>
          {quizData.questions[currentQuestion].options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio sx={{ color: "#00f0ff" }} />}
              label={option}
              sx={{ color: "#fff", "& .MuiTypography-root": { fontSize: { xs: "0.875rem", sm: "1rem" } } }}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          onClick={nextQuestion}
          disabled={!answers[currentQuestion]}
          sx={{
            background: "linear-gradient(45deg, #00f0ff, #ff4ecd)",
            fontSize: { xs: "0.875rem", sm: "1rem" },
            py: { xs: 1, sm: 1.5 },
            "&:hover": { background: "linear-gradient(45deg, #00d0e0, #ff30bd)" },
          }}
        >
          {currentQuestion < 4 ? "Next" : "Finish"}
        </Button>
      </Box>
    </Box>
  );
}