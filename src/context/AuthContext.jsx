// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const active = localStorage.getItem('active_user');
      return active ? JSON.parse(active) : null;
    } catch {
      return null;
    }
  });

  const register = (name, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('users_database') || '[]');

    if (users.some((u) => u.email === cleanEmail)) {
      return { success: false, message: 'This email is already registered.' };
    }

    const newUser = { id: Date.now(), name: name.trim(), email: cleanEmail, password };
    users.push(newUser);
    localStorage.setItem('users_database', JSON.stringify(users));
    localStorage.setItem('active_user', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = JSON.parse(localStorage.getItem('users_database') || '[]');

    const foundUser = users.find(
      (u) => u.email === cleanEmail && u.password === password
    );

    if (!foundUser) {
      return {
        success: false,
        message: 'Account does not exist or wrong password! Please sign up first.',
      };
    }

    localStorage.setItem('active_user', JSON.stringify(foundUser));
    setUser(foundUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('active_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);