/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | null>(null);

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false); 
    }
    setLoading(false); // Set loading to false once the token check is done
  }, []);

  // Function to handle user login
  const login = (token: string) => {
    setIsLoggedIn(true);
    localStorage.setItem('accessToken', token); // Store the token in localStorage
  };

  // Function to handle user logout
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('accessToken'); // Remove the token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {loading ? <div>Loading...</div> : children} {/* Show loading message until authentication check is done */}
    </AuthContext.Provider>
  );
}
