import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/POST";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

const AddCollection = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [collectionData, setCollectionData] = useState({
    name: "",
    description: "",
    topic: "",
    imageURL: "",
  });
  const [customFields, setCustomFields] = useState([
    { field_name: "", field_type: "string" },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollectionData({
      ...collectionData,
      [name]: value,
    });
  };

  const handleAddField = () => {
    setCustomFields([
      ...customFields,
      { field_name: "", field_type: "string" },
    ]);
  };

  const handleRemoveField = (index) => {
    const newFields = customFields.filter((_, i) => i !== index);
    setCustomFields(newFields);
  };

  const handleCustomFieldChange = (index, key, value) => {
    const newFields = customFields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setCustomFields(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const finalCollectionData = {
      ...collectionData,
      user_id: user.id,
      custom_fields: customFields,
    };
    console.log(finalCollectionData);

    try {
      const response = await POST("collection", finalCollectionData);

      if (!response.success) {
        console.error("Creation Failed:", response.message || "Unknown error");
        toast.error(response.message);
        return { success: false, message: response.message || "Unknown error" };
      }
      setLoading(true);
      console.log("Collection created Successfully:", response.message);

      setCollectionData({
        name: "",
        description: "",
        topic: "",
        imageURL: "",
      });

      setCustomFields([{ field_name: "", field_type: "string" }]);
      if (user?.role == "Admin") navigate("/dashboard/all-collections");
      if (user?.role == "User") navigate("/dashboard/user/collection");
      return { success: true, message: response.message };
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 mt-10 transition duration-300"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Add Collection
      </h1>

      <div className="relative mb-6">
        <input
          type="text"
          id="name"
          name="name"
          value={collectionData.name}
          onChange={handleInputChange}
          placeholder="Collection Name"
          className="block w-full py-3 px-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:outline-none transition duration-300"
          required
        />
      </div>

      <div className="relative mb-6">
        <textarea
          id="description"
          name="description"
          value={collectionData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={4}
          className="block w-full py-3 px-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:outline-none transition duration-300"
        ></textarea>
      </div>

      <div className="relative mb-6">
        <select
          id="topic"
          name="topic"
          value={collectionData.topic}
          onChange={handleInputChange}
          className="block w-full py-3 px-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:outline-none transition duration-300"
          required
        >
          <option value="" disabled>
            Select a Topic
          </option>
          <option value="Books">Books</option>
          <option value="Signs">Signs</option>
          <option value="Silverware">Silverware</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Custom Fields
        </h3>
        {customFields.map((field, index) => (
          <div key={index} className="flex items-center mb-4">
            <input
              required
              type="text"
              placeholder="Field Name"
              value={field.field_name}
              onChange={(e) =>
                handleCustomFieldChange(index, "field_name", e.target.value)
              }
              className="block w-full py-2 px-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:outline-none transition duration-300 mr-2"
            />
            <select
              value={field.field_type}
              onChange={(e) =>
                handleCustomFieldChange(index, "field_type", e.target.value)
              }
              className="block w-full py-2 px-4 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 focus:outline-none transition duration-300 mr-2"
            >
              <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="multiline text">Multiline Text</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 border border-red-500 rounded-lg p-1 hover:bg-red-100 dark:hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50 transition duration-300"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="w-full py-2 px-4 bg-blue-100 text-blue-500 font-semibold rounded-lg hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
        >
          Add Custom Field
        </button>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
      >
        Create Collection
      </button>
    </form>
  );
};

export default AddCollection;
