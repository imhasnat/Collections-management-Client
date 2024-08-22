import React, { useEffect, useState } from "react";
import { GET } from "../services/GET";
import Spinner from "../components/Spinner";
import { Link, useParams } from "react-router-dom";
import Table from "../components/Table";

const ItemPage = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await GET(`collection/${id}/items`);
      setItems(data);
      setLoading(false);
    };

    fetchCollections();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {items?.length < 1 ? <h1>No data</h1> : "Data"}
      <Link
        to={`/collection/item/${id}`}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block"
      >
        Add New item
      </Link>
      <Table />
    </div>
  );
};

export default ItemPage;
