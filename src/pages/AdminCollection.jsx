import React, { useContext, useEffect, useState } from "react";
import { GET } from "../services/GET";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import UserCollection from "../components/Dashboard/User/UserCollection";
import toast from "react-hot-toast";

const AdminCollectionPage = () => {
  const base_URL = "http://localhost:3306";
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`collection`);
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, [user.id, trigger]);

  const deleteCollection = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${base_URL}/collection/${id}`, {
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
      <UserCollection
        collections={collections}
        deleteCollection={deleteCollection}
      />
    </div>
  );
};

export default AdminCollectionPage;
