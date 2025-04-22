import { Routes, Route, Link } from "react-router-dom";
import UsersPage from "./UsersPage";
import ProductsPage from "./ProductPage";
import StockPage from "./StockPage";
import ReportPage from "./ReportPage";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">APADE Stock</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/users" className="hover:text-blue-300">Users</Link>
          <Link to="/products" className="hover:text-blue-300">Products</Link>
          <Link to="/stock" className="hover:text-blue-300">Stock In/Out</Link>
          <Link to="/report" className="hover:text-blue-300">Report</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default Dashboard;
