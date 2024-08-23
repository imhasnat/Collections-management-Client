import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { GET } from "../services/GET";
import UserTable from "../components/Dashboard/Admin/UserTable";
import { DELETE } from "../services/DELETE";
import { PUT } from "../services/PUT";

const UserListPage = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await GET(`users`);
      setUsers(data);
      setLoading(false);
    };

    fetchItems();
  }, [trigger, user.role]);

  const deleteUser = async (id, role) => {
    let url;
    if (role == "User") url = `users/${id}`;
    if (role == "Admin") url = `users/delete-own-account`;

    try {
      const response = await DELETE(`${url}`);
      if (response.success) setTrigger(!trigger);
      if (!response.success) {
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  const changeStatus = async (id) => {
    try {
      const response = await PUT(`users/${id}/status`);
      if (response) setTrigger(!trigger);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const changeRole = async (id) => {
    let role = "User";
    try {
      const response = await fetch(
        `https://collections-management-server.onrender.com/users/${id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return { success: false, message: data.message || "Unknown error" };
      }
      setTrigger(!trigger);
      console.log(data.message);
    } catch (error) {
      console.error("Error deleting collection:", error);
      return { success: false, message: error.message };
    }
  };

  const changeAdminRole = async (id) => {
    try {
      const response = await PUT(`users/${id}/remove-admin`);
      if (response) setTrigger(!trigger);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <UserTable
        users={users}
        deleteUser={deleteUser}
        changeStatus={changeStatus}
        changeRole={changeRole}
        changeAdminRole={changeAdminRole}
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default UserListPage;
