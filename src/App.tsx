import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleUserSubmit = (user) => {
    if (editingUser !== null) {

      const updatedUsers = users.map((u, index) =>
        index === editingUser ? user : u
      );
      setUsers(updatedUsers);
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const handleDeleteUser = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  const handleEditUser = (index) => {
    setEditingUser(index);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management System</h1>
      <UserForm
        onSubmit={handleUserSubmit}
        editingUser={editingUser !== null ? users[editingUser] : null}
      />
      <UserList
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default App;