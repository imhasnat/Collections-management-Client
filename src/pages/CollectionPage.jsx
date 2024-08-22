import React, { useEffect, useState } from "react";
import { GET } from "../services/GET";
import CollectionTable from "../components/Collections/CollectionTable";
import Spinner from "../components/Spinner";

const CollectionPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET("collection");
      setCollections(data);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <CollectionTable collections={collections} />
    </div>
  );
};

export default CollectionPage;
