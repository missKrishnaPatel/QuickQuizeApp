const express = require("express");
const router = express.Router();
const { getQuizByTitle } = require("../controllers/quizController");

router.get("/quizzes/:title", (req, res) => {
  console.log("API route hit with title:", req.params.title); // Debug
  const quiz = getQuizByTitle(req.params.title);
  if (quiz) res.json(quiz);
  else res.status(404).json({ error: "Quiz not found" });
});

module.exports = router;