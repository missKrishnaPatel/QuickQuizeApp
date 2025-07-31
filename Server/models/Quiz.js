const Quiz = {
  id: Number,
  title: String,
  description: String,
  category: String,
  difficulty: String,
  questions: [
    {
      id: Number,
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
  time: Number,
};

module.exports = Quiz;