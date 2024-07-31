import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import PageNotFound from "../pages/errors/404";
import Loading from "../components/Loading"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "loading",
        element: <Loading />
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