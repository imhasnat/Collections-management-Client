import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Public";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900 pb-20">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
