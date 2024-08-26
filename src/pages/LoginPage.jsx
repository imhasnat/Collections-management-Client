import React, { useContext, useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/loginApi";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    const { success, message, user } = await loginApi(formData);
    setLoading(false);
    try {
      if (success) {
        login(user);
        navigate("/");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error while login:", error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Login onSubmit={handleSubmit} />
    </div>
  );
};

export default LoginPage;
