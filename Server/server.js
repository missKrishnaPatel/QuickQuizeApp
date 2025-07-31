require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const arenaRoutes = require('./routes/arenaRoutes');

// const quizRoutes = require('./routes/quizeRoutes.js');
const quizRoutes = require('./routes/quizeRoutes');
const quizRoute = require('./routes/quizRoutes');



const app = express();
connectDB();

app.use(express.json());
app.use(cors());
// app.use(express.json());

app.use('/api/quizzes', quizRoutes);


app.get('/', (req, res) => {
  res.send('MongoDB Atlas connected!');
});

app.use('/api', quizRoute);
app.use('/api', arenaRoutes);
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
