import React, { useState } from "react";

const UserForm = ({ onSubmit, editingUser }) => {
  const [name, setName] = useState(editingUser?.name || "");
  const [email, setEmail] = useState(editingUser?.email || "");
  const [role, setRole] = useState(editingUser?.role || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, role };
    onSubmit(newUser);
    setName("");
    setEmail("");
    setRole("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>{editingUser ? "Edit User" : "Add User"}</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Role:</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
      </div>
      <button type="submit">{editingUser ? "Update" : "Add"} User</button>
    </form>
  );
};

export default UserForm;