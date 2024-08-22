import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AddCollection = () => {
  const { user } = useContext(AuthContext);
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
    const finalCollectionData = {
      ...collectionData,
      user_id: user.id,
      custom_fields: customFields,
    };
    console.log(finalCollectionData);

    try {
      const response = await fetch(
        `https://collections-management-server.onrender.com/collection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalCollectionData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Creation Failed:", data.message || "Unknown error");
        return { success: false, message: data.message || "Unknown error" };
      }

      console.log("Collection created Successfully:", data.message);

      // Reset the fields if the response is OK
      setCollectionData({
        name: "",
        description: "",
        topic: "",
        imageURL: "",
      });

      setCustomFields([{ field_name: "", field_type: "string" }]);
      if (user?.role == "Admin") navigate("/dashboard/all-collections");
      if (user?.role == "User") navigate("/dashboard/user/collection");
      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error submitting form:", error.message);
      return { success: false, message: error.message };
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10"
    >
      <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-gray-900 mb-6">
        Add Collection
      </h1>

      <div className="relative flex items-center mb-4">
        <input
          type="text"
          id="name"
          name="name"
          value={collectionData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        />
      </div>

      <div className="relative flex items-center mb-4">
        <textarea
          id="description"
          name="description"
          value={collectionData.description}
          onChange={handleInputChange}
          placeholder="Description"
          rows={5}
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        ></textarea>
      </div>

      <div className="relative flex items-center mb-4">
        <select
          id="topic"
          name="topic"
          value={collectionData.topic}
          onChange={handleInputChange}
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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

      {/* <div className="relative flex items-center mb-4">
        <input
          type="url"
          id="imageURL"
          name="imageURL"
          value={collectionData.imageURL}
          onChange={handleInputChange}
          placeholder="Image URL"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div> */}

      <div className="mb-4">
        <h3 className="text-gray-700 font-semibold mb-2">Custom Fields</h3>
        {customFields.map((field, index) => (
          <div key={index} className="relative flex items-center mb-2">
            <input
              required
              type="text"
              placeholder="Field Name"
              value={field.field_name}
              onChange={(e) =>
                handleCustomFieldChange(index, "field_name", e.target.value)
              }
              className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
            />
            <select
              value={field.field_type}
              onChange={(e) =>
                handleCustomFieldChange(index, "field_type", e.target.value)
              }
              className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
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
              className="text-red-500 border rounded-lg p-1 border-red-500 hover:text-red-700 focus:outline-none"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="w-full text-center px-5 py-2 text-md   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
        >
          Add Custom Field
        </button>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Create Collection
      </button>
    </form>
  );
};

export default AddCollection;
