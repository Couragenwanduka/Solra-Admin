import axios from 'axios';

export interface User {
  firstName: string;
  lastName: string;
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
const createUser = async (user: User): Promise<UserResponse> => {
  try {
    const response = await axios.post<UserResponse>(
      `${API_URL}/user/register`,
      user
    );

    return response.data
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export default createUser;
