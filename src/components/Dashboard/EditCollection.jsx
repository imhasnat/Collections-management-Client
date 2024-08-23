import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";

const EditCollection = () => {
  const { user } = useContext(AuthContext);
  const { collection_id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState({
    name: "",
    description: "",
    topic: "",
    image_url: "",
    custom_fields: [],
  });
  console.log(collection);
  const fetchCollectionData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3306/collection/${collection_id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCollection(data);
      } else {
        console.error("Failed to fetch collection data");
      }
    } catch (error) {
      console.error("Error fetching collection data:", error.message);
    }
  };

  useEffect(() => {
    fetchCollectionData();
  }, [collection_id]);

  const handleCustomFieldChange = (index, key, value) => {
    const newFields = collection.custom_fields.map((field, i) =>
      i === index ? { ...field, [key]: value } : field
    );
    setCollection({ ...collection, custom_fields: newFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCollection = {
      ...collection,
      user_id: user.id,
    };
    console.log(updatedCollection);

    try {
      const response = await fetch(
        `http://localhost:3306/collection/${collection_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCollection),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.error("Update Failed:", data.message || "Unknown error");
      } else {
        console.log("Collection updated Successfully:", data.message);
        if (user?.role == "Admin") navigate("/dashboard/all-collections");
        if (user?.role == "User") navigate("/dashboard/user/collection");
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10"
    >
      <h1 className="text-2xl font-semibold text-gray-800 capitalize dark:text-gray-900 mb-6">
        Edit Collection
      </h1>

      <div className="relative flex items-center mb-4">
        <input
          type="text"
          id="name"
          value={collection.name}
          onChange={(e) =>
            setCollection({ ...collection, name: e.target.value })
          }
          placeholder="Name"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          required
        />
      </div>

      <div className="relative flex items-center mb-4">
        <textarea
          id="description"
          value={collection.description}
          onChange={(e) =>
            setCollection({ ...collection, description: e.target.value })
          }
          placeholder="Description"
          rows={5}
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        ></textarea>
      </div>

      <div className="relative flex items-center mb-4">
        <select
          id="topic"
          value={collection.topic}
          onChange={(e) =>
            setCollection({ ...collection, topic: e.target.value })
          }
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
          value={collection.image_url}
          onChange={(e) =>
            setCollection({ ...collection, image_url: e.target.value })
          }
          placeholder="Image URL"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div> */}

      <div className="mb-4">
        <h3 className="text-gray-700 font-semibold mb-2">Custom Fields</h3>
        {collection.custom_fields.map((field, index) => (
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
              disabled
              onChange={(e) =>
                handleCustomFieldChange(index, "field_type", e.target.value)
              }
              className="block w-full py-2 text-gray-700 bg-white border rounded-lg px-3 dark:bg-gray-100 dark:text-gray-800 dark:border-gray-300 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mr-2"
            >
              <option value={field.field_type}>{field.field_type}</option>
              {/* <option value="string">String</option>
              <option value="integer">Integer</option>
              <option value="boolean">Boolean</option>
              <option value="date">Date</option>
              <option value="text">Text</option> */}
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Update Collection
      </button>
    </form>
  );
};

export default EditCollection;
