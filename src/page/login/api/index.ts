import axios from 'axios';

export interface User {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const API_URL = import.meta.env.VITE_API_URL;

// Accepts a User object and returns a Promise that resolves to a UserResponse
const loginUser = async (user: User) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/login`,
      user,
      // {
      //   withCredentials: true,
      // }
    );
    return response.data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default loginUser;
