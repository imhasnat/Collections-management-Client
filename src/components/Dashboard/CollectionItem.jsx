import React from "react";
import { Link } from "react-router-dom";

const CollectionItem = ({ items, deleteCollection, collection_id }) => {
  console.log(items);
  return (
    <div>
      {items.length < 1 ? (
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            No Collections
          </h2>
          <button>
            <Link
              to={`/dashboard/add/${collection_id}/items`}
              className=" text-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
            >
              Add Items
            </Link>
          </button>
        </div>
      ) : (
        <>
          <h1>All items</h1>
          <button>
            <Link
              to={`/dashboard/add/${collection_id}/items`}
              className=" text-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
            >
              Add Items
            </Link>
          </button>
        </>
      )}
    </div>
  );
};

export default CollectionItem;
