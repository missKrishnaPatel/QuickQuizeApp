import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuizById } from "../api/quizAPI";
import QuestionCard from "../components/QuizCard";
import { Container, Typography, LinearProgress } from "@mui/material";

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuizById(id).then(res => setQuiz(res.data)).catch(console.error);
  }, [id]);

  const handleAnswer = (selected) => {
    if (selected === quiz.questions[current].correctAnswer) {
      setScore(prev => prev + 1);
    }

    if (current + 1 < quiz.questions.length) {
      setCurrent(current + 1);
    } else {
      navigate("/result", {
        state: { score: score + (selected === quiz.questions[current].correctAnswer ? 1 : 0), total: quiz.questions.length },
      });
    }
  };

  if (!quiz) return <LinearProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{quiz.title}</Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Question {current + 1} of {quiz.questions.length}
      </Typography>
      <QuestionCard
        question={quiz.questions[current].question}
        options={quiz.questions[current].options}
        currentIndex={current}
        onAnswer={handleAnswer}
      />
    </Container>
  );
}
