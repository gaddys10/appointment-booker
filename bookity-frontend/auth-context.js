// auth-context.js
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);     // { _id, email, ... } from your backend
    const [token, setToken] = useState(null);   // JWT or whatever you return
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const bootstrap = async () => {
            try {
                const storedToken = await SecureStore.getItemAsync("authToken");
                const storedUser = await SecureStore.getItemAsync("authUser");

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.warn("Error loading auth state", e);
            } finally {
                setLoading(false);
            }
        };

        bootstrap();
    }, []);

    const signIn = async (newToken, newUser) => {
        setToken(newToken);
        setUser(newUser);
        await SecureStore.setItemAsync("authToken", newToken);
        await SecureStore.setItemAsync("authUser", JSON.stringify(newUser));
    };

    const signOut = async () => {
        setToken(null);
        setUser(null);
        await SecureStore.deleteItemAsync("authToken");
        await SecureStore.deleteItemAsync("authUser");
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside an AuthProvider");
    }
    return ctx;
}
