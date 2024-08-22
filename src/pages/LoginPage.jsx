import React, { useContext, useState } from "react";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/loginApi";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (formData) => {
    const { success, message, user } = await loginApi(formData);
    try {
      if (success) {
        login(user);
        setMessage("Login successful! Redirecting to Home page...");
        setIsError(false);
        setTimeout(() => navigate("/"), 1000);
      } else {
        setIsError(true);
        setMessage(`Error: ${message}`);
      }
    } catch (error) {
      console.error("Error while login:", error.message);
      setIsError(true);
      setMessage(`Unexpected Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Login
        onSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        isError={isError}
      />
    </div>
  );
};

export default LoginPage;
