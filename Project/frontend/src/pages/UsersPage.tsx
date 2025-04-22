import { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: "", password: "" });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users", { withCredentials: true });
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/users", form, { withCredentials: true });
    setForm({ username: "", password: "" });
    fetchUsers();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`, { withCredentials: true });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
        <input className="border p-2" placeholder="Username" value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="border p-2" type="password" placeholder="Password" value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="bg-blue-500 text-white px-4 rounded">Add</button>
      </form>

      <ul className="bg-white shadow p-4 rounded">
        {users.map(user => (
          <li key={user._id} className="flex justify-between py-1 border-b">
            <span>{user.username}</span>
            <button onClick={() => handleDelete(user._id)} className="text-red-500">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
