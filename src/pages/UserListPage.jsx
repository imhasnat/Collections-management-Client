import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { GET } from "../services/GET";
import UserTable from "../components/Dashboard/Admin/UserTable";

const UserListPage = () => {
  const base_URL = "https://collections-management-server.onrender.com";
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await GET(`users`);
      setUsers(data);
      setLoading(false);
    };

    fetchItems();
  }, [trigger]);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`${base_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete collection: ${response.statusText}`);
      }
      setTrigger(!trigger);
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <UserTable users={users} deleteItem={deleteUser} />
    </div>
  );
};

export default UserListPage;
