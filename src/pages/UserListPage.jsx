import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import { GET } from "../services/GET";
import UserTable from "../components/Dashboard/Admin/UserTable";
import { DELETE } from "../services/DELETE";
import { PUT } from "../services/PUT";
import { useNavigate } from "react-router-dom";

const UserListPage = () => {
  const { user, logout } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const { trigger, setTrigger } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const data = await GET(`users`);
      setUsers(data);
      setLoading(false);
    };

    fetchItems();
  }, [trigger, user.role]);

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await DELETE(`users/${id}`);
      if (response.success) {
        if (id === user.id) {
          logout();
          navigate("/login");
        } else {
          setTrigger(!trigger);
        }
      }
      setLoading(false);
      if (!response.success) {
        setErrorMsg(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting collection:", error);
    }
  };

  const changeStatus = async (id) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await PUT(`users/${id}/status`);
      if (response.success) setTrigger(!trigger);
      else setErrorMsg(response.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      setErrorMsg(error.message);
    }
  };

  const changeRole = async (id) => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await PUT(`users/${id}/role`);
      if (response.success) {
        setLoading(false);
        setTrigger(!trigger);
      } else {
        setErrorMsg(response.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error deleting collection:", error);
      setErrorMsg(error.message);
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
        errorMsg={errorMsg}
      />
    </div>
  );
};

export default UserListPage;
