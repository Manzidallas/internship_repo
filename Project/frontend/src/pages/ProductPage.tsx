// Project/frontend/src/pages/ProductPage.tsx
import { useEffect, useState, FormEvent } from "react";
import api from "../services/api";
import { Product } from "../types";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!productName.trim()) {
      return setError("Product name is required");
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await api.post("/products", { product_name: productName });
      setProductName("");
      fetchProducts();
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}
      
      <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input 
          className="border p-2" 
          placeholder="Product Name"
          value={productName} 
          onChange={e => setProductName(e.target.value)} 
          disabled={isSubmitting}
        />
        <button 
          className="bg-green-500 text-white px-4 rounded disabled:bg-green-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>

      {loading ? (
        <div className="p-4 text-center">Loading products...</div>
      ) : (
        <ul className="bg-white shadow p-4 rounded">
          {products.length === 0 ? (
            <li className="text-gray-500 py-2">No products found</li>
          ) : (
            products.map(p => (
              <li key={p._id} className="flex justify-between py-1 border-b">
                <span>{p.product_name}</span>
                <button 
                  onClick={() => handleDelete(p._id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductsPage;