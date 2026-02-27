// API utility functions for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiService = {
  // Check backend health
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Health check failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },

  // Upload and predict video
  async predictVideo(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/predict_video`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Prediction failed');
      }

      return data;
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  },
};
