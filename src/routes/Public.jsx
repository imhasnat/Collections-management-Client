import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import RegistrationPage from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import CollectionPage from "../pages/CollectionPage";
import Private from "./Private";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardPage from "../pages/DashboardPage";
import ItemPage from "../pages/ItemPage";
import UserCollectionPage from "../pages/UserCollectionPage";
import AddCollectionPage from "../pages/AddCollectionPage";
import EditCollectionPage from "../pages/EditCollectionPage";
import UserItemPage from "../pages/UserItemPage";
import AddItem from "../components/Dashboard/AddItem";
import EditItem from "../components/Dashboard/EditItem";
import UserListPage from "../pages/UserListPage";
import AdminCollectionPage from "../pages/AdminCollection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/registration",
        element: <RegistrationPage />,
      },
      {
        path: "/collection",
        element: <CollectionPage />,
      },
      {
        path: "/collection/:id/item",
        element: <ItemPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Private>
        <DashboardLayout />{" "}
      </Private>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard/user/collection",
        element: <UserCollectionPage />,
      },
      {
        path: "/dashboard/add/collection",
        element: <AddCollectionPage />,
      },
      {
        path: "/dashboard/edit/collection/:collection_id",
        element: <EditCollectionPage />,
      },
      {
        path: "/dashboard/collection/:collection_id/item",
        element: <UserItemPage />,
      },
      {
        path: "/dashboard/add/:id/items",
        element: <AddItem />,
      },
      {
        path: "/dashboard/edit/collection/:collection_id/item/:item_id",
        element: <EditItem />,
      },
      {
        path: "/dashboard/users-list",
        element: <UserListPage />,
      },
      {
        path: "/dashboard/all-collections",
        element: <AdminCollectionPage />,
      },
    ],
  },
]);
