import React from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useTranslation } from "react-i18next";

const UserTable = ({ users, deleteUser, changeStatus, changeRole }) => {
  const { t } = useTranslation();
  return (
    <section className="container px-4 mx-auto mt-10">
      {users?.length < 1 ? (
        <div className="flex justify-between items-center gap-x-3">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            {t("noUser")}
          </h2>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-x-3">
            <h2 className="text-lg  font-medium text-gray-800 dark:text-white">
              {t("userList")}
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
                            <span>{t("fn")}</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>{t("ln")}</span>
                          </div>
                        </th>

                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("email")}</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-2">
                            <span>{t("role")}</span>
                          </button>
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {t("status")}
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          {t("action")}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {users?.map((user) => (
                        <tr key={user?.user_id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {user?.first_name}
                                </h2>
                              </div>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   ">
                              <h2 className="text-sm font-normal  dark:text-white">
                                {user?.last_name}
                              </h2>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   ">
                              <h2 className="text-sm font-normal dark:text-white ">
                                {user?.email}
                              </h2>
                            </div>
                          </td>
                          <td className="px-10 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   ">
                              <h2
                                className={`text-sm font-normal dark:text-white ${
                                  user.role == "Admin" &&
                                  "text-red-500 font-extrabold"
                                }`}
                              >
                                {user?.role}
                              </h2>
                            </div>
                          </td>
                          <td className="px-6 py-4 pl-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2   ">
                              <h2
                                className={`text-sm font-normal ${
                                  user.status == "Active"
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                              >
                                {user?.status}
                              </h2>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <button
                                onClick={() => deleteUser(user.user_id)}
                                className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
                              >
                                <MdOutlineDeleteForever className="w-5 h-5 border-blue-500  text-blue-500" />
                              </button>
                              <button
                                onClick={() => changeStatus(user.user_id)}
                                className=" text-center px-2 py-1 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
                              >
                                {user?.status == "Active" ? "Block" : "Active"}
                              </button>
                              {user?.role == "User" && (
                                <button
                                  onClick={() => changeRole(user.user_id)}
                                  className=" text-center px-2 py-1 text-sm   capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 border-blue-500  text-blue-500  bg-blue-100/60"
                                >
                                  Switch Role
                                </button>
                              )}
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

export default UserTable;
