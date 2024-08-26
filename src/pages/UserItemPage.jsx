import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GET } from "../services/GET";
import CollectionItem from "../components/Dashboard/CollectionItem";
import toast from "react-hot-toast";

const UserItemPage = () => {
  const base_URL = "http://localhost:3306";
  const { collection_id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchItems = async () => {
      const data = await GET(`collection/${collection_id}/items`);
      setItems(data);
      setLoading(false);
    };

    fetchItems();
  }, [collection_id, trigger]);

  const deleteItem = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${base_URL}/items/${id}`, {
        method: "DELETE",
      });
      setLoading(false);
      if (!response.ok) {
        toast.error(response.statusText);
        throw new Error(`Failed to delete collection: ${response.statusText}`);
      }
      setTrigger(!trigger);
    } catch (error) {
      toast.error(error);
      console.error("Error deleting collection:", error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <CollectionItem
        items={items}
        deleteItem={deleteItem}
        collection_id={collection_id}
      />
    </div>
  );
};

export default UserItemPage;
