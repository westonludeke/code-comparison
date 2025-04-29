import api from './api';
import axios from 'axios';

// Description: Login a user
export const login = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Description: Register a new user
export const register = async (email: string, password: string) => {
  try {
    const { data } = await api.post('/auth/register', { email, password });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

// Description: Logout a user
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
