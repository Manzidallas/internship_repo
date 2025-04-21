const UserDashboard = () => {
    const [products, setProducts] = React.useState([]);
    const { token, logout } = React.useContext(AuthContext);
  
    const fetchData = async () => {
      try {
        const productRes = await axios.get('http://localhost:3000/api/products', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(productRes.data);
      } catch (error) {
        alert('Error fetching data: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };
  
    React.useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">User Dashboard</h1>
          <button onClick={logout} className="bg-red-500 text-white p-2">Logout</button>
        </div>
  
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