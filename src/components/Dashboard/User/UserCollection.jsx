import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const UserCollection = ({ collections, deleteCollection }) => {
  const { t } = useTranslation();
  return (
    <section className="container px-4 mx-auto mt-10">
      {collections.length < 1 ? (
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {t("noCollection")}
          </h2>
          <button>
            <Link
              to={`/dashboard/add/collection`}
              className=" text-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
            >
              {t("addCollection")}
            </Link>
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-x-3">
            <h2 className="text-lg  font-medium text-gray-800 dark:text-white">
              {t("collection")}
            </h2>
            <button>
              <Link
                to={`/dashboard/add/collection`}
                className=" text-center px-5 py-2 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
              >
                {t("addCollection")}
              </Link>
            </button>
          </div>

          <div className="flex flex-col mt-6">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>{t("name")}</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("category")}</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("cusField")}</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {t("corresItem")}
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {collections.map((collection) => (
                        <tr key={collection.collection_id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {collection.name}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   ">
                              <h2 className="text-sm font-normal dark:text-white ">
                                {collection.topic}
                              </h2>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-2 items-center px-3 py-1 rounded-full gap-2 overflow-x-auto ">
                              {collection?.custom_fields?.map((ele) => (
                                <p
                                  key={ele?.custom_field_id}
                                  className="px-3 py-1 text-xs  rounded-full dark:text-white "
                                >
                                  {ele?.field_name}
                                </p>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                            <Link
                              to={`/dashboard/collection/${collection.collection_id}/item`}
                              className=" text-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
                            >
                              {t("viewItem")}
                            </Link>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() =>
                                  deleteCollection(collection.collection_id)
                                }
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                              >
                                <MdOutlineDeleteForever className="w-5 h-5" />
                              </button>

                              <Link
                                to={`/dashboard/edit/collection/${collection.collection_id}`}
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                              >
                                <BiEdit className="w-5 h-5" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default UserCollection;
