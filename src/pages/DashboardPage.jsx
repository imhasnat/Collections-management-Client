import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-5xl dark:text-white">
        {t("hi")} <span className="font-bold text-primary">{user.name}</span>
      </h1>
      <h2 className="text-3xl dark:text-white">
        {t("welcome")}{" "}
        <span className="font-bold text-primary">{t("dashboard")}</span>
      </h2>
    </div>
  );
};

export default DashboardPage;
