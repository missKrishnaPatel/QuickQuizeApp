import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import {  useNavigate } from "react-router-dom";

export default function QuizCard({ quiz }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the quiz details page
    navigate("/form", { state: { quiz } });
  }
  return (
    <Card
      sx={{
        width: 300, // Fixed width
        height: 400, // Fixed height
        m: 2,
        borderRadius: 4,
        backgroundColor: "#1e1e2f",
        color: "#fff",
        transition: "transform 0.3s",
        display: "flex", // Use flexbox to manage layout
        flexDirection: "column", // Stack content vertically
        "&:hover": {
          transform: "scale(1.03)",
          backgroundColor: "#1e1e27ff",
          boxShadow: "0 4px 20px rgba(75, 69, 105, 0.9)",
          cursor: "pointer",
          border: "1px solid #90caf9",
          // boxShadow: 6,
        },
      }}
    >
      <Box
        component="img"
        src={quiz.image}
        alt={quiz.title}
        sx={{
          height: 160, // Fixed image height
          width: "100%",
          objectFit: "cover",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />
      <CardContent
        sx={{
          flex: 1, // Allow content to take remaining space
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // Distribute content evenly
          overflow: "hidden", // Handle overflow
        }}
      >
        <Box>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Chip label={quiz.category} color="primary" />
            <Chip label={quiz.difficulty} color="secondary" size="small" />
          </Stack>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis", // Truncate long titles
            }}
          >
            {quiz.title}
          </Typography>
          <Typography
            variant="body2"
            color="#aaa"
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 3, // Limit description to 3 lines
              WebkitBoxOrient: "vertical",
            }}
          >
            {quiz.description}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row" justifyContent="space-between" my={1}>
            <Typography variant="caption">{quiz.questions} questions</Typography>
            <Typography variant="caption">{quiz.time} min</Typography>
          </Stack>
          <Button
  fullWidth
  variant="contained"
  sx={{
    mt: 1,
    borderColor: "#90caf9",
    backgroundImage: "linear-gradient(45deg, #5219b4ff, #8b11b0ff)", // Use backgroundImage for gradients
    color: "#fff",
    "&:hover": {
      // backgroundImage: "none", // Remove gradient on hover for consistency
      // backgroundColor: "#303f9f", // Fallback hover color
      color: "#fff",
    },

  }}
  onClick={handleClick} // Handle click event
>
  Enter Challenge
</Button>
        </Box>
      </CardContent>
    </Card>
  );
}