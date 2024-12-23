import React, { useState, createContext, useContext, useEffect } from "react";

// Define User interface
interface User {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _id?: any;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    picture?: string;
    role?: string;
    isVerified?: boolean;
    phoneNumber?: string;
}

// Define the context
const UsersContext = createContext<{ user: User | undefined; setUser: React.Dispatch<React.SetStateAction<User | undefined>>;} | undefined>(undefined);

// UserProvider component to provide the context value
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | undefined>(undefined);

    // Load user data from localStorage on initial render
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Save user data to localStorage whenever it changes
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user"); // Clear localStorage if user is undefined
        }
    }, [user]);

    return (
        <UsersContext.Provider value={{ user, setUser }}>
            {children}
        </UsersContext.Provider>
    );
};

// Custom hook to use the user context
export const useUser = (): {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
} => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
