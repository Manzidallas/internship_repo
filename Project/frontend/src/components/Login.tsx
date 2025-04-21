const Login = () => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { login } = React.useContext(AuthContext);
    const navigate = ReactRouterDOM.useNavigate();
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/login', { username, password });
        login(response.data.token, response.data.role);
        navigate(response.data.role === 'admin' ? '/admin' : '/user');
      } catch (error) {
        alert('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };
  
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4">Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button onClick={handleLogin} className="bg-blue-500 text-white p-2 w-full">Login</button>
        </div>
      </div>
    );
  };