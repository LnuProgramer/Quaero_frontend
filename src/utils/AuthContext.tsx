import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        !!localStorage.getItem('isLoggedIn') // Зберігаємо стан логіну
    );

    const handleSetIsLoggedIn = (value: boolean) => {
        setIsLoggedIn(value);
        if (value) {
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            localStorage.removeItem('isLoggedIn');
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn: handleSetIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
