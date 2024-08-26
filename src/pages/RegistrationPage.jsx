import React, { useState } from "react";
import Registration from "../components/Registration";
import { registerApi } from "../services/registerApi";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const { success, message } = await registerApi(formData);
      setLoading(false);
      if (success) {
        navigate("/login");
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error(error.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Registration onSubmit={handleSubmit} />
    </div>
  );
};

export default RegistrationPage;
