import React from "react";
import { useTranslation } from "react-i18next";

const Ticket = ({ tickets, domain }) => {
  const { t } = useTranslation();
  console.log(tickets);
  return (
    <section className="container px-4 mx-auto mt-10">
      {tickets?.length < 1 ? (
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {t("noTicket")}
          </h2>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-x-3">
            <h2 className="text-lg  font-medium text-gray-800 dark:text-white">
              {t("Tickets")}
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
                            <span>{t("summary")}</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>{t("key")}</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("origin")}</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("status")}</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {t("jiraLink")}
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {tickets?.map((item) => (
                        <tr key={item?.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {item.fields.summary}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {item.key}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-1 items-center px-3 py-1 rounded-full gap-x-2">
                              <h2 className="text-sm font-normal dark:text-white">
                                {item?.fields.customfield_10038}
                              </h2>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-1 items-center px-3 py-1 rounded-full gap-x-2">
                              <h2 className="text-sm font-normal dark:text-white">
                                {item?.fields.status.name}
                              </h2>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="grid grid-cols-1 items-center px-3 py-1 rounded-full gap-x-2">
                              <a
                                className="text-blue-400"
                                href={`https://${domain}/browse/${item.key}`}
                              >
                                Jira url
                              </a>
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

export default Ticket;
