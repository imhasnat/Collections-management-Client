import React, { useState } from "react";
import Registration from "../components/Registration";
import { registerApi } from "../services/registerApi";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const { success, message } = await registerApi(formData);
      if (success) {
        setMessage("Registration successful! Redirecting to login...");
        setIsError(false);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setIsError(true);
        setMessage(`Error: ${message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      setIsError(true);
      setMessage(`Unexpected Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Registration
        onSubmit={handleSubmit}
        message={message}
        setMessage={setMessage}
        isError={isError}
      />
    </div>
  );
};

export default RegistrationPage;
