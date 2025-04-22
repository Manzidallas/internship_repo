import { useEffect, useState } from "react";
import axios from "axios";

const ReportPage = () => {
  const [report, setReport] = useState([]);

  const fetchReport = async () => {
    const res = await axios.get("http://localhost:5000/api/stock/report", { withCredentials: true });
    setReport(res.data);
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Stock Report</h2>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left p-2">Product</th>
            <th className="text-left p-2">Remaining Stock</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item, idx) => (
            <tr key={idx} className="border-b">
              <td className="p-2">{item.product_name}</td>
              <td className="p-2">{item.stock_remaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportPage;
