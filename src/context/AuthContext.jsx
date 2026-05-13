import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import api from '../api/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);

    async function login(email, password) {
        try {
            const response = await api.post('/login', {
                email,
                password,
            });

            const { token } = response.data;

            localStorage.setItem('token', token);

            return {
                success: true,
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    'Erro ao realizar login',
            };
        }
    }

    async function createAccount(name, email, password) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                return {
                    success: true,
                };
            }

            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    'Erro ao tentar criar conta',
            };
        } catch (error) {
            return {
                success: false,
                message:
                    error.response?.data?.message ||
                    'Erro ao tentar criar conta',
            };
        }
    }

    return (
        <AuthContext.Provider
            value={{
                login,
                createAccount,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}