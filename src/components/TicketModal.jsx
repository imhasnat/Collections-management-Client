import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Modal = ({ isOpen, closeModal, handleSubmit }) => {
  const { user } = useContext(AuthContext);
  const link = useLocation();
  const base_URL = `http://localhost:5173${link.pathname}`;
  const [formData, setFormData] = useState({
    summary: "",
    priority: "Low",
    email: user.email,
    collection: "",
    link: base_URL,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
          Create Issue
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="summary"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="priority"
              className="block text-gray-700 dark:text-gray-300 mb-2"
            >
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 mr-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const TicketModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        "https://collections-management-server.onrender.com/create-jira-issue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      closeModal();
      toast.success(result.message.message);
    } catch (error) {
      console.error("Error creating issue:", error);
      toast.error("Failed to create issue: " + error.message);
    }
  };

  return (
    <div className=" flex items-center rounded-md justify-center  ">
      <button
        onClick={openModal}
        className="px-3 py-2  bg-transparent border border-blue-600 text-blue-600 text-sm hover:bg-blue-700 hover:text-white focus:ring-2 focus:ring-blue-500"
      >
        Create support ticket
      </button>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default TicketModal;
