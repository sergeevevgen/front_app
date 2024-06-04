import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Функция для логина
    const signIn = (newUser, cb) => {
        setUser(newUser);
        // Сохраняем нашего пользователя в локал сторедж
        localStorage.setItem('user', JSON.stringify(newUser));
        cb();
    }

    // Функция для разлогина
    const signOut = (cb) => {
        setUser(null);
        // Удаляем нашего пользователя из локал сторедж
        localStorage.removeItem('user');
        cb();
    }

    const value = {user, signIn, signOut};

    return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>)
}