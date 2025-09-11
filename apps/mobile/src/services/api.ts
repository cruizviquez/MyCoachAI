import axios from 'axios';

// For development in Codespaces, use localhost
// For production, this would be your deployed API URL
const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const analyzeForm = async (exerciseType: string, keypoints: any[]) => {
  try {
    const response = await api.post('/api/v1/pose/analyze', {
      exercise_type: exerciseType,
      keypoints: keypoints,
      timestamp: Date.now(),
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getExercises = async () => {
  try {
    const response = await api.get('/api/v1/pose/exercises');
    return response.data.exercises;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;
