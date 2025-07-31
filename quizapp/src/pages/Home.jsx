import { useState, useEffect } from "react";
import { Box, Container, Grid, Typography, TextField, useTheme, Fade } from "@mui/material";
import QuizCard from "../components/QuizCard";
import CategoryFilter from "../components/CategoryFilter";

// Generate random placeholder images from Picsum
// const getRandomImage = (seed) => `https://picsum.photos/seed/${seed}/400/300`;
// const getRandomImage = (seed) => `https://source.unsplash.com/400x300/?programming,code,technology&sig=${seed}`;
// const getRandomImage = (seed) => `https://source.unsplash.com/random/400x300?programming&sig=${seed}`;
// const getRandomImage = (keyword, seed) =>
//   `https://source.unsplash.com/random/400x300?${keyword}&sig=${seed}`;




// Enhanced dummy data with random images
const quizzes = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics, variables, and functions",
    category: "Programming",
    difficulty: "Easy",
    questions: 5,
    time: 15,
    image: "/d.png", // Placeholder image
  },
  {
    id: 2,
    title: "React Hooks Mastery",
    description: "Advanced React Hooks concepts and best practices",
    category: "React",
    difficulty: "Hard",
    questions: 5,
    time: 25,
    image: "/ddd.png",
  },
  {
    id: 3,
    title: "CSS Grid & Flexbox",
    description: "Master modern CSS layout techniques",
    category: "CSS",
    difficulty: "Medium",
    questions: 5,
    time: 20,
    image:"/tttt.png",
  },
  {
    id: 4,
    title: "TypeScript Basics",
    description: "Learn the fundamentals of TypeScript typing system",
    category: "Programming",
    difficulty: "Medium",
    questions: 5,
    time: 20,
    image: "/dd.png",
  },
  {
    id: 5,
    title: "Node.js Core Concepts",
    description: "Understand the core modules and architecture of Node.js",
    category: "Backend",
    difficulty: "Hard",
    questions: 5,
    time: 25,
    image: "/ttt.png",
  },
  {
    id: 6,
    title: "HTML5 Features",
    description: "Explore the modern features of HTML5",
    category: "HTML",
    difficulty: "Easy",
    questions: 5,
    time: 15,
    image:"/tt.png",
  },
  {
    id: 7,
    title: "Python Data Structures",
    description: "Master lists, dictionaries, and tuples in Python",
    category: "Python",
    difficulty: "Medium",
    questions: 5,
    time: 20,
    image: "/dddd.png",
  },
  {
    id: 8,
    title: "Git & Version Control",
    description: "Essential Git commands and workflows",
    category: "Tools",
    difficulty: "Easy",
    questions: 5,
    time: 15,
    image: "/t.png",
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const theme = useTheme();

  // Get unique categories
  const categories = ["All", ...new Set(quizzes.map((quiz) => quiz.category))];

  useEffect(() => {
    const filtered = quizzes.filter((quiz) => {
      const matchesCategory = selectedCategory === "All" || quiz.category === selectedCategory;
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredQuizzes(filtered);
  }, [selectedCategory, searchQuery]);

  return (
    <Box sx={{ 
      backgroundColor: "#050510", 
      minHeight: "100vh",
      width: "100vw",
      overflowX: "hidden",
      position: "relative",
      py: 0,
      '&::before': {
        content: '""',
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at 20% 30%, rgba(0, 240, 255, 0.05) 0%, transparent 25%),
          radial-gradient(circle at 80% 70%, rgba(255, 78, 205, 0.05) 0%, transparent 25%),
          linear-gradient(to bottom, rgba(5, 5, 16, 1), rgba(10, 10, 30, 1))
        `,
        zIndex: 0,//jjj
      }
    }}>
      {/* Floating particles background */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "fixed",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: 2,
            height: 2,
            borderRadius: "50%",
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
            zIndex: 0,
            animation: `float ${10 + Math.random() * 20}s linear infinite`,
            '@keyframes float': {
              '0%': { transform: 'translateY(0) translateX(0)' },
              '50%': { transform: `translateY(${Math.random() * 100 - 50}px) translateX(${Math.random() * 100 - 50}px)` },
              '100%': { transform: 'translateY(0) translateX(0)' },
            }
          }}
        />
      ))}

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 6 }}>
        {/* Header Section */}
        <Box 
          sx={{ 
            textAlign: "center", 
            mb: 8,
            px: 2,
            animation: "fadeIn 1s ease-in",
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(-20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            }
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{ 
              color: "transparent",
              background: "linear-gradient(to right, #00f0ff, #ff4ecd)",
              backgroundClip: "text",
              fontWeight: 900,
              letterSpacing: "2px",
              textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
              mb: 2,
              fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
              lineHeight: 1.1,
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '4px',
                background: 'linear-gradient(to right, #00f0ff, #ff4ecd)',
                borderRadius: '2px',
                filter: 'blur(2px)',
                opacity: 0.7,
              }
            }}
          >
            QuizNeon
          </Typography>
          <Typography 
            variant="h5" 
            color="#ddd" 
            sx={{ 
              fontWeight: 300,
              letterSpacing: "1px",
              maxWidth: "800px",
              margin: "0 auto",
              lineHeight: 1.6,
              mb: 6,
              textShadow: "0 0 10px rgba(255,255,255,0.2)",
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(0, 240, 255, 0.5), transparent)',
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0,
              }
            }}
          >
            Challenge your mind in the digital arena
          </Typography>

          {/* Features Grid */}
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            {['Precision Scoring', 'Global Leaderboard', 'Real-time Progress'].map((feature, index) => (
              <Grid item key={index}>
                <Box
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(0, 240, 255, 0.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(0, 240, 255, 0.2)',
                    },
                    '& svg': {
                      mr: 1,
                      color: index === 0 ? '#00f0ff' : index === 1 ? '#ff4ecd' : '#7bff00',
                    }
                  }}
                >
                  {index === 0 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                  {feature}
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Stats Section */}
         <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
  {[
    { value: '5', label: 'Active Quizzes', color: '#00f0ff' },
    { value: '5', label: 'Categories', color: '#ff4ecd' },
    { value: '50+', label: 'Brain Teasers', color: '#7bff00' },
    { value: '5K+', label: 'Players', color: '#ffa500' }
  ].map((stat, index) => (
    <Grid item key={index} xs={6} sm={3}>
      <Box 
        sx={{ 
          textAlign: 'center',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 2,
          p: 3,
          transition: 'all 0.3s ease',
          minHeight: '150px',
          '&:hover': {
            borderColor: stat.color,
            boxShadow: `0 10 25px ${stat.color}33`,
            transform: 'translateY(-5px)'
          }
        }}
      >
        <Typography 
          variant="h3" 
          sx={{
            color: stat.color,
            fontWeight: 700,
            mb: 1,
            textShadow: `0 0 10px ${stat.color}80`,
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
          }}
        >
          {stat.value}
        </Typography>
        <Typography 
          variant="body1" 
          color="#aaa"
          sx={{ 
            fontWeight: 300,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontSize: '0.85rem'
          }}
        >
          {stat.label}
        </Typography>
      </Box>
    </Grid>
  ))}
</Grid>

          {/* Search Bar */}
          
          <Box 
            sx={{ 
              maxWidth: "700px",
              mx: "auto",
              mb: 4,
              transition: "all 0.3s ease",
              '&:hover': {
                transform: "scale(1.01)",
              }
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for knowledge..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: "#fff",
                  '& fieldset': {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderRadius: "50px",
                  },
                  '&:hover fieldset': {
                    borderColor: "rgba(0, 240, 255, 0.5)",
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: "rgba(255, 78, 205, 0.8)",
                    boxShadow: "0 0 0 2px rgba(255, 78, 205, 0.2)",
                  },
                },
                '& .MuiInputLabel-root': {
                  color: "rgba(255, 255, 255, 0.7)",
                },
              }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ color: "rgba(255, 255, 255, 0.7)", mr: 1 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </Box>
                ),
              }}
            />
          </Box>
          </Box>

          {/* Category Filter */}
          <Box sx={{ mb: 6 }}
          >
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              setSelected={setSelectedCategory}
              
            />
          </Box>
        

        {/* Quiz Grid */}
        <Grid 
          container 
          spacing={1.5} 
          justifyContent="center"
          sx={{
            px: { xs: 2, sm: 4 },
          }}
        >
          {filteredQuizzes.map((quiz) => (
            <Grid 
              item 
              key={quiz.id} 
              xs={12} 
              sm={6} 
              lg={4} 
              xl={3}
              sx={{
                transition: "transform 0.4s ease, opacity 0.4s ease",
              }}
            >
              <Fade in timeout={800}>
                <Box>
                  <QuizCard quiz={quiz} />
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredQuizzes.length === 0 && (
          <Fade in timeout={500}>
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 12,
                border: "1px dashed rgba(255, 255, 255, 0.1)",
                borderRadius: 4,
                background: "rgba(255, 255, 255, 0.03)",
                maxWidth: "800px",
                mx: "auto",
                mt: 4,
              }}
            >
              <Typography 
                variant="h4" 
                color="#ddd"
                sx={{ 
                  mb: 3,
                  fontWeight: 300,
                  letterSpacing: "1px",
                }}
              >
                No quizzes found
              </Typography>
              <Typography 
                variant="body1" 
                color="#999"
                sx={{ 
                  maxWidth: "600px",
                  mx: "auto",
                  lineHeight: 1.8,
                }}
              >
                {searchQuery ? 
                  `No quizzes match your search for "${searchQuery}". Try a different search term.` : 
                  `No quizzes available in the ${selectedCategory} category. Try selecting "All" categories.`}
              </Typography>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
}