import { useEffect, useState } from "react";
import axios from "axios";

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product_id: "", quantity: "", type: "in" });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products", { withCredentials: true });
    setProducts(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = form.type === "in" ? "in" : "out";
    await axios.post(`http://localhost:5000/api/stock/${endpoint}`, {
      product_id: form.product_id,
      quantity: parseInt(form.quantity)
    }, { withCredentials: true });

    setForm({ ...form, quantity: "" });
    alert(`Stock ${form.type} recorded`);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock In / Out</h2>
      <form className="flex flex-col gap-3 max-w-md" onSubmit={handleSubmit}>
        <select className="border p-2" value={form.product_id}
          onChange={e => setForm({ ...form, product_id: e.target.value })}>
          <option value="">Select product</option>
          {products.map(p => (
            <option key={p._id} value={p._id}>{p.product_name}</option>
          ))}
        </select>

        <input className="border p-2" type="number" placeholder="Quantity"
          value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />

        <select className="border p-2" value={form.type}
          onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default StockPage;
