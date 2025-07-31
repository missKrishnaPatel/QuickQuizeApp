import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api/quizAPI";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItemButton,
} from "@mui/material";

export default function QuizListPage() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuizzes().then((res) => setQuizzes(res.data)).catch(console.error);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Quizzes
      </Typography>
      <List>
        {quizzes.map((quiz, i) => (
          <ListItemButton key={i} onClick={() => navigate(`/quiz/${quiz._id}`)} sx={{ mb: 2 }}>
            <Card sx={{ width: "100%" }}>
              <CardContent>
                <Typography variant="h6">{quiz.title}</Typography>
                <Typography variant="body2">{quiz.questions.length} Questions</Typography>
              </CardContent>
            </Card>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
