import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const fetchQuizzes = () => axios.get(`${API_BASE}/quizzes`);
export const fetchQuizById = (id) => axios.get(`${API_BASE}/quiz/${id}`);
