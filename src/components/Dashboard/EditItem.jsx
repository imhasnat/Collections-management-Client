import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET } from "../../services/GET";
import Spinner from "../Spinner";

const EditItemForm = () => {
  const navigate = useNavigate();
  const { collection_id, item_id } = useParams();
  const [item, setItem] = useState({
    name: "",
    tags: [],
    custom_fields: [],
  });
  const [loading, setLoading] = useState(true);
  console.log(item);
  useEffect(() => {
    const fetchItem = async () => {
      const data = await GET(`items/${item_id}`);
      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [item_id]);

  if (loading) {
    return <Spinner />;
  }

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTagChange = (index, value) => {
    const updatedTags = [...item.Tags];
    updatedTags[index] = { ...updatedTags[index], tag_name: value };
    setItem({ ...item, Tags: updatedTags });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...item.custom_fields];
    updatedFields[index] = {
      ...updatedFields[index],
      CustomFieldValue: {
        ...updatedFields[index].CustomFieldValue,
        field_value: value,
      },
    };
    setItem({ ...item, custom_fields: updatedFields });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transform the data structure
    const formattedItem = {
      name: item.name,
      custom_field_values: {},
      tags: item.Tags.map((tag) => tag.tag_name),
    };

    // Format custom field values
    item.custom_fields.forEach((field) => {
      formattedItem.custom_field_values[field.custom_field_id] =
        field.CustomFieldValue.field_value;
    });

    console.log("Formatted item for submission:", formattedItem);

    try {
      const response = await fetch(`http://localhost:3306/items/${item_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedItem),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Update Failed:", data.message || "Unknown error");
      } else {
        console.log("Item updated Successfully:", data.message);
        navigate(`/dashboard/collection/${collection_id}/item`);
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
      {item.custom_fields.map((field, index) => (
        <div key={field.custom_field_id} className="mb-4">
          <label
            htmlFor={`custom-field-${field.custom_field_id}`}
            className="block mb-2"
          >
            {field.field_name}
          </label>
          {field.field_type === "String" && (
            <input
              type="text"
              id={`custom-field-${field.custom_field_id}`}
              value={field.CustomFieldValue?.field_value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.field_type === "Integer" && (
            <input
              type="number"
              id={`custom-field-${field.custom_field_id}`}
              value={field.CustomFieldValue?.field_value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
          {field.field_type === "Multiline Text" && (
            <textarea
              id={`custom-field-${field.custom_field_id}`}
              value={field.CustomFieldValue?.field_value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          )}
          {field.field_type === "Boolean" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`custom-field-${field.custom_field_id}`}
                checked={field.CustomFieldValue?.field_value === "true"}
                onChange={(e) =>
                  handleCustomFieldChange(
                    index,
                    e.target.checked ? "true" : "false"
                  )
                }
                className="mr-2"
              />
              <label htmlFor={`custom-field-${field.custom_field_id}`}>
                {field.field_name}
              </label>
            </div>
          )}
          {field.field_type === "Date" && (
            <input
              type="date"
              id={`custom-field-${field.custom_field_id}`}
              value={field.CustomFieldValue?.field_value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          )}
        </div>
      ))}
      {item.Tags.map((tag, index) => (
        <div key={tag.tag_id} className="mb-4">
          <label htmlFor={`tag-${tag.tag_id}`} className="block mb-2">
            Tag {index + 1}
          </label>
          <input
            type="text"
            id={`tag-${tag.tag_id}`}
            value={tag.tag_name}
            onChange={(e) => handleTagChange(index, e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Item
      </button>
    </form>
  );
};

export default EditItemForm;
