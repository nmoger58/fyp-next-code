// API utility functions for backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Returns the stored JWT token from localStorage (client-side only).
 */
const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('access_token');
};

/**
 * Builds an Authorization header object if a token exists.
 */
const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiService = {
  // ──────────────────────────────────────────────
  // Health
  // ──────────────────────────────────────────────
  async checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error('Health check failed');
    return response.json();
  },

  // ──────────────────────────────────────────────
  // Auth — Login
  // ──────────────────────────────────────────────
  async login(username, password) {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Login failed');
    return data;
  },

  // ──────────────────────────────────────────────
  // Auth — Signup
  // ──────────────────────────────────────────────
  async signup(userData) {
    // userData: { username, password, full_name? }
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.detail || data.error || 'Signup failed');
    return data;
  },

  // ──────────────────────────────────────────────
  // Auth — Current User
  // ──────────────────────────────────────────────
  async getCurrentUser() {
    const token = getToken();
    if (!token) return null;

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { Accept: 'application/json', ...authHeaders() },
    });

    if (!response.ok) throw new Error('Failed to fetch user info');
    return response.json();
  },

  // ──────────────────────────────────────────────
  // Video Prediction
  // ──────────────────────────────────────────────
  async predictVideo(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/predict_video`, {
      method: 'POST',
      headers: { Accept: 'application/json', ...authHeaders() },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || data.detail || 'Prediction failed');
    return data;
  },

  // ──────────────────────────────────────────────
  // Scan History
  // ──────────────────────────────────────────────
  /** Fetch the logged-in user's past scan history from MongoDB. */
  async getHistory() {
    const token = getToken();
    if (!token) return { history: [], total: 0 };

    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers: { Accept: 'application/json', ...authHeaders() },
    });

    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json(); // { history: [...], total: N }
  },

  /** Delete all scan history for the logged-in user. */
  async clearHistory() {
    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'DELETE',
      headers: { Accept: 'application/json', ...authHeaders() },
    });

    if (!response.ok) throw new Error('Failed to clear history');
    return response.json();
  },
};
