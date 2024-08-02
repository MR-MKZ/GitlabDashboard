import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout";
import PageNotFound from "../pages/errors/404";
import Loading from "../components/Loading"
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />
      }
    ]
  },
  {
    path: "/auth",
    children: [
      {
        index: true,
        loader: async ()  => redirect("/auth/login")
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signup",
        element: <RegisterPage />
      }
    ]
  },
  {
    path: "*",
    element: <PageNotFound />
  }
])


export default function AppRouter() {
  return (
    <RouterProvider router={router} fallbackElement={<Loading />} />
  )
}