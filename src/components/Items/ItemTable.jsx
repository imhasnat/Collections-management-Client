import React from "react";
import { useTranslation } from "react-i18next";

const ItemTable = ({ items }) => {
  const { t } = useTranslation();

  return (
    <section className="container px-4 mx-auto mt-10">
      {items?.length < 1 ? (
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {t("noItem")}
          </h2>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-x-3">
            <h2 className="text-lg  font-medium text-gray-800 dark:text-white">
              {t("item")}
            </h2>
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
                            <span>{t("cusField")}</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("cusFieldValue")}</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {t("tags")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {items?.map((item) => (
                        <tr key={item?.item_id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {item.name}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-1 items-center px-3 py-1 rounded-full gap-x-2">
                              {item?.custom_fields?.map((ele) => (
                                <h2
                                  key={ele?.custom_field_id}
                                  className="text-sm font-normal dark:text-white "
                                >
                                  {ele?.field_name},
                                </h2>
                              ))}
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-1 items-center px-3 py-1 rounded-full gap-x-2    ">
                              {item?.custom_field_values?.map((ele) => (
                                <h2
                                  key={ele?.custom_field_value_id}
                                  className="text-sm font-normal  dark:text-white"
                                >
                                  {ele?.field_value},
                                </h2>
                              ))}
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-2 items-center px-3 py-1 rounded-full gap-2 overflow-x-auto ">
                              {item?.Tags?.map((ele) => (
                                <p
                                  key={ele?.tag_id}
                                  className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60"
                                >
                                  {ele?.tag_name}
                                </p>
                              ))}
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

export default ItemTable;
