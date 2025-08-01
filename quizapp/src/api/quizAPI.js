import axios from "axios";

const API_BASE = "https://quickquizeapp.onrender.com/api";

export const fetchQuizzes = () => axios.get(`${API_BASE}/quizzes`);
export const fetchQuizById = (id) => axios.get(`${API_BASE}/quiz/${id}`);
