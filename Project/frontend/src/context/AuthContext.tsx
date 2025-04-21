const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = React.useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = React.useState(localStorage.getItem('role') || '');

  const login = (newToken, role) => {
    setToken(newToken);
    setUserRole(role);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', role);
  };

  const logout = () => {
    setToken('');
    setUserRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};