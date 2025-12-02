"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
    user: boolean;
    login: () => void;
    logout: () => void;
    };

    const AuthContext = createContext<AuthContextType | undefined>(undefined);

    export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(false);

    const login = () => setUser(true);
    const logout = () => setUser(false);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }

    export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
}
