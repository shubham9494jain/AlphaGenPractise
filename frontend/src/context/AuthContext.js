import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const storedTokens = localStorage.getItem('authTokens');
            const storedUser = localStorage.getItem('user');
            if (storedTokens && storedUser) {
                setTokens(JSON.parse(storedTokens));
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            // Handle potential parsing errors
            setTokens(null);
            setUser(null);
        }
    }, []);

    const login = (newTokens, newUser) => {
        setTokens(newTokens);
        setUser(newUser);
        localStorage.setItem('authTokens', JSON.stringify(newTokens));
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const logout = () => {
        setTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
    };

    const contextData = {
        tokens,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
