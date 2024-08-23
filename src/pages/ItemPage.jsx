import React, { useEffect, useState } from "react";
import { GET } from "../services/GET";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import ItemTable from "../components/Items/ItemTable";

const ItemPage = () => {
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(items);

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
      <ItemTable items={items} />
    </div>
  );
};

export default ItemPage;
