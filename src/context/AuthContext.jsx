import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

const AUTH_KEY = 'lms_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(AUTH_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock API call
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(foundUser));
        toast.success('Logged in!');
        return foundUser;
      } else {
        toast.error('Invalid credentials');
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed');
      throw error;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const newUser = { id: Date.now(), email, password, name, role: 'student' };
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
      toast.success('Account created!');
    } catch (error) {
      toast.error('Signup failed');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    toast.success('Logged out');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isInstructor = user?.role === 'instructor';
  const isStudent = user?.role === 'student';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      isAuthenticated, 
      loading, 
      isAdmin, 
      isInstructor, 
      isStudent 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
