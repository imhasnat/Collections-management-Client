import React from "react";
import TopCollection from "../components/Collections/TopCollection";
import RecentItems from "../components/Items/RecentItems";

const HomePage = () => {
  return (
    <div className="my-20 mx-auto">
      <div>
        <h1 className="text-3xl pl-4 text-center">Top 5 collections</h1>
        <TopCollection />
      </div>
      <div className="mt-20">
        <h1 className="text-3xl text-center pl-4">Recent Items</h1>
        <RecentItems />
      </div>
    </div>
  );
};

export default HomePage;
