import React, { useContext, useEffect, useState } from "react";
import { GET } from "../services/GET";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
import UserCollection from "../components/Dashboard/User/UserCollection";

const UserCollectionPage = () => {
  const base_URL = "https://collections-manage.netlify.app";
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, trigger, setTrigger } = useContext(AuthContext);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`user/${user.id}/collections`);
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, [user.id, trigger]);

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
      <UserCollection
        collections={collections}
        deleteCollection={deleteCollection}
      />
    </div>
  );
};

export default UserCollectionPage;
