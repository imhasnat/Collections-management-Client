import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { GET } from "../services/GET";
import CollectionItem from "../components/Dashboard/CollectionItem";

const UserItemPage = () => {
  const base_URL = "https://collections-management-server.onrender.com";
  const { collection_id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`collection/${collection_id}/items`);
      setItems(data);
      setLoading(false);
    };

    fetchCollections();
  }, [collection_id, trigger]);

  const deleteCollection = async (id) => {
    try {
      const response = await fetch(`${base_URL}/collection/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete collection: ${response.statusText}`);
      }
      setTrigger(!trigger);
    } catch (error) {
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
        deleteCollection={deleteCollection}
        collection_id={collection_id}
      />
    </div>
  );
};

export default UserItemPage;
