import api from './api';

// Description: Login a user
// Endpoint: POST /api/auth/login
// Request: { email: string, password: string }
// Response: { accessToken: string, refreshToken: string, message: string }
export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Register a new user
// Endpoint: POST /api/auth/register
// Request: { email: string, password: string }
// Response: { accessToken: string, refreshToken: string, message: string }
export const register = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/auth/register', { email, password });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Logout a user
// Endpoint: POST /api/auth/logout
// Request: {}
// Response: { message: string }
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};