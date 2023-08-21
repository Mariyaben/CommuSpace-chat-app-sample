// api.js
import axios from 'axios';

// Define the base URL of your backend server
const BASE_URL = 'http://localhost:5000'; // Replace with your actual backend URL

export const getUserCommunities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/user-communities`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
