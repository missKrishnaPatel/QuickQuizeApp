import { useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const score = state?.score ?? 0;
  const total = state?.total ?? 0;

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>Quiz Completed 🎉</Typography>
      <Typography variant="h5" gutterBottom>Your Score: {score} / {total}</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>Go Back Home</Button>
    </Container>
  );
}
