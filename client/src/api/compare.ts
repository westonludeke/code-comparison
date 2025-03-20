import api from './api';

// Description: Compare two code snippets
// Endpoint: POST /api/compare
// Request: { originalCode: string, changedCode: string }
// Response: { success: boolean, differences: Array<{value: string, added?: boolean, removed?: boolean}> }
export const compareCode = async (data: { originalCode: string; changedCode: string }) => {
  try {
    const response = await api.post('/compare', data);
    return response.data;
  } catch (error: any) {
    console.error('Error comparing code:', error);
    throw new Error(error?.response?.data?.message || error.message);
  }
};