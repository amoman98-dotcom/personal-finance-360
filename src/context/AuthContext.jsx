import { createContext, useContext, useState } from 'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('pf360_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, name) => {
    const userData = { email, name: name || email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('pf360_user', JSON.stringify(userData));
  };

  const register = (name, email) => {
    const userData = { name, email };
    setUser(userData);
    localStorage.setItem('pf360_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pf360_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);