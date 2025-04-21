const ProtectedRoute = ({ children, allowedRole }) => {
    const { token, userRole } = React.useContext(AuthContext);
    const navigate = ReactRouterDOM.useNavigate();
  
    React.useEffect(() => {
      if (!token || userRole !== allowedRole) {
        navigate('/login');
      }
    }, [token, userRole, navigate]);
  
    return token && userRole === allowedRole ? children : null;
  };