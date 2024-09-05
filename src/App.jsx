import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Public";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="bg-white dark:bg-gray-900  ">
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </div>
  );
};

export default App;
