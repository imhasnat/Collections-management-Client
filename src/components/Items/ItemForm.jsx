// src/components/ItemForm.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET } from "../../services/GET";
import Spinner from "../Spinner";
import { POST } from "../../services/POST";

const ItemForm = () => {
  const { id } = useParams();
  const [item, setItem] = useState({
    name: "",
    tags: [],
  });
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`collection/${id}/custom-fields`);
      console.log(data);
      setCustomFields(data);
      setLoading(false);
    };

    fetchCollections();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setItem({ ...item, tags });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await POST(`collections/${id}/items`, item);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto sm:max-w-full">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={item.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={item.tags.join(",")}
          onChange={handleTagChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      {customFields?.map((field, index) => (
        <div key={field.collection_id} className="mb-4">
          <label
            htmlFor={`custom-field-${field.collection_id}`}
            className="block mb-2"
          >
            {field.field_name}
          </label>
          {field.field_type === "String" && (
            <input
              type="text"
              id={`custom-field-${field.collection_id}`}
              value={customFields[index].value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.field_type === "Integer" && (
            <input
              type="number"
              id={`custom-field-${field.collection_id}`}
              value={customFields[index].value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.field_type === "Multiline Text" && (
            <textarea
              id={`custom-field-${field.collection_id}`}
              value={customFields[index].value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          )}
          {field.field_type === "Boolean" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`custom-field-${field.collection_id}`}
                checked={customFields[index].value}
                onChange={(e) =>
                  handleCustomFieldChange(index, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={`custom-field-${field.collection_id}`}>
                {field.field_name}
              </label>
            </div>
          )}
          {field.field_type === "Date" && (
            <input
              type="date"
              id={`custom-field-${field.customFieldId}`}
              value={customFields[index].value}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Item
      </button>
    </form>
  );
};

export default ItemForm;
