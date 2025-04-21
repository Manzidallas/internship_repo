const AdminDashboard = () => {
    const [users, setUsers] = React.useState([]);
    const [products, setProducts] = React.useState([]);
    const [newUser, setNewUser] = React.useState({ username: '', password: '' });
    const [newProduct, setNewProduct] = React.useState({ product_name: '', quantity: 0 });
    const { token, logout } = React.useContext(AuthContext);
  
    const fetchData = async () => {
      try {
        const userRes = await axios.get('http://localhost:3000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const productRes = await axios.get('http://localhost:3000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(userRes.data);
        setProducts(productRes.data);
      } catch (error) {
        alert('Error fetching data: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };
  
    const addUser = async () => {
      try {
        await axios.post('http://localhost:3000/api/users', newUser, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
        setNewUser({ username: '', password: '' });
      } catch (error) {
        alert('Error adding user: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };
  
    const addStock = async () => {
      try {
        await axios.post('http://localhost:3000/api/stock/in', newProduct, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchData();
        setNewProduct({ product_name: '', quantity: 0 });
      } catch (error) {
        alert('Error adding stock: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };
  
    React.useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">Admin Dashboard</h1>
          <button onClick={logout} className="bg-red-500 text-white p-2">Logout</button>
        </div>
  
        <div className="mb-8">
          <h2 className="text-xl mb-2">Add User</h2>
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            className="border p-2 mr-2"
          />
          <button onClick={addUser} className="bg-green-500 text-white p-2">Add User</button>
        </div>
  
        <div className="mb-8">
          <h2 className="text-xl mb-2">Stock In</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.product_name}
            onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
            className="border p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newProduct.quantity}
            onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) })}
            className="border p-2 mr-2"
          />
          <button onClick={addStock} className="bg-green-500 text-white p-2">Stock In</button>
        </div>
  
        <h2 className="text-xl mb-2">Users</h2>
        <ul className="mb-4">
          {users.map(user => (
            <li key={user.user_id} className="border p-2">{user.username}</li>
          ))}
        </ul>
  
        <h2 className="text-xl mb-2">Stock Status</h2>
        <ul>
          {products.map(product => (
            <li key={product.product_id} className="border p-2">
              {product.product_name}: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
    );
  };