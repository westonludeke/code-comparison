import api from './api';

// Description: Save a code snippet
// Endpoint: POST /api/snippets
// Request: { name: string, code: string }
// Response: { success: boolean, message: string, snippet: { _id: string, name: string, code: string } }
export const saveCodeSnippet = async (data: { name: string; code: string }) => {
  try {
    console.log('Token being sent in request:', localStorage.getItem('accessToken'));
    const response = await api.post('/snippets', data);
    return response.data;
  } catch (error: any) {
    console.error('Error saving code snippet:', error);
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// Description: Get all saved code snippets
// Endpoint: GET /api/snippets
// Request: {}
// Response: { snippets: Array<{ _id: string, name: string, code: string }> }
export const getSavedSnippets = async () => {
  try {
    const response = await api.get('/snippets');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching saved snippets:', error);
    throw new Error(error?.response?.data?.message || error.message);
  }
};