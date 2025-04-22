import { useEffect, useState } from "react";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [product_name, setProductName] = useState("");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products", { withCredentials: true });
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", { product_name }, { withCredentials: true });
    setProductName("");
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input className="border p-2" placeholder="Product Name"
          value={product_name} onChange={e => setProductName(e.target.value)} />
        <button className="bg-green-500 text-white px-4 rounded">Add</button>
      </form>

      <ul className="bg-white shadow p-4 rounded">
        {products.map(p => (
          <li key={p._id} className="flex justify-between py-1 border-b">
            <span>{p.product_name}</span>
            <button onClick={() => handleDelete(p._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
