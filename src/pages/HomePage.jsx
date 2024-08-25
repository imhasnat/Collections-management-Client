import React from "react";
import TopCollection from "../components/Collections/TopCollection";
import RecentItems from "../components/Items/RecentItems";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10 mx-auto flex flex-col items-center md:flex-row gap-10 md:items-start  justify-center">
      <div>
        <h1 className="text-3xl pl-4 text-center dark:text-white">
          {t("top5")}
        </h1>
        <TopCollection />
      </div>
      <div className="">
        <h1 className="text-3xl text-center pl-4 dark:text-white">
          {t("recentItem")}
        </h1>
        <RecentItems />
      </div>
    </div>
  );
};

export default HomePage;
