import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { GET } from "../../services/GET";
import Spinner from "../Spinner";
import { POST } from "../../services/POST";

const AddItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    tags: [],
  });
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tagOptions, setTagOptions] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`collection/${id}/custom-fields`);
      const initializedFields = data.map((field) => ({
        custom_field_id: field.custom_field_id,
        field_name: field.field_name,
        field_type: field.field_type,
        value: "",
      }));
      setCustomFields(initializedFields);
      setLoading(false);
    };

    const fetchTags = async () => {
      const response = await GET("tags");
      const options = response.data.map((tag) => ({
        value: tag.tag_id,
        label: tag.tag_name,
      }));
      setTagOptions(options);
    };

    fetchCollections();
    fetchTags();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleTagChange = (selectedOptions) => {
    setItem({ ...item, tags: selectedOptions });
  };

  const handleCustomFieldChange = (index, value) => {
    const updatedFields = [...customFields];
    updatedFields[index].value = value;
    setCustomFields(updatedFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        name: item.name,
        tags: item.tags.map((tag) => tag.label),
        custom_field_values: {},
      };

      customFields.forEach((field) => {
        if (field.value) {
          itemData.custom_field_values[field.custom_field_id] = field.value;
        }
      });

      console.log(itemData);
      await POST(`collections/${id}/items`, itemData);
      navigate(`/dashboard/collection/${id}/item`);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mt-10 transition duration-300"
    >
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={item.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="tags"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Tags
        </label>
        <CreatableSelect
          isMulti
          options={tagOptions}
          value={item.tags}
          onChange={handleTagChange}
          className="w-full"
          classNamePrefix="react-select"
          placeholder="Select or create tags"
          formatCreateLabel={(inputValue) => `Create tag "${inputValue}"`}
        />
      </div>
      {customFields?.map((field, index) => (
        <div key={field.custom_field_id} className="mb-6">
          <label
            htmlFor={`custom-field-${field.custom_field_id}`}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {field.field_name}
          </label>
          {field.field_type === "String" && (
            <input
              type="text"
              id={`custom-field-${field.custom_field_id}`}
              value={customFields[index].value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
            />
          )}
          {field.field_type === "Integer" && (
            <input
              type="number"
              id={`custom-field-${field.custom_field_id}`}
              value={customFields[index].value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
            />
          )}
          {field.field_type === "Multiline Text" && (
            <textarea
              id={`custom-field-${field.custom_field_id}`}
              value={customFields[index].value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
              rows={3}
            />
          )}
          {field.field_type === "Boolean" && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={`custom-field-${field.custom_field_id}`}
                checked={customFields[index].value || false}
                onChange={(e) =>
                  handleCustomFieldChange(index, e.target.checked)
                }
                className="mr-2 h-5 w-5 text-blue-500 focus:ring-blue-400 dark:focus:ring-blue-400 rounded"
              />
              <label
                htmlFor={`custom-field-${field.custom_field_id}`}
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {field.field_name}
              </label>
            </div>
          )}
          {field.field_type === "Date" && (
            <input
              type="date"
              id={`custom-field-${field.custom_field_id}`}
              value={customFields[index].value || ""}
              onChange={(e) => handleCustomFieldChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition duration-300"
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-500 transition duration-300"
      >
        Create Item
      </button>
    </form>
  );
};

export default AddItem;
