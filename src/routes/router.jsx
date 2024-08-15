import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage.jsx";
import PageNotFound from "../pages/errors/404";
import Loading from "../components/Loading"
import LoginPage from "../pages/auth/LoginPage.jsx";
import RegisterPage from "../pages/auth/RegisterPage.jsx";
import Cookies from "js-cookie";
import { checkLogin } from "../api/index.js";
import TasksPage from "../pages/TasksPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        loader: () => {
            let token = Cookies.get("token")
            if (!token) {
                return redirect("/auth/login")
            }
            return null
        },
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: "tasks",
                element: <TasksPage />
            }
        ]
    },
    {
        path: "/auth",
        loader: async () => {
            try {
                let token = Cookies.get("token")
                if (token) {
                    await checkLogin()
                } else {
                    return null
                }
            } catch (e) {
                return null
            }
            return redirect("/")
        },
        children: [
            {
                index: true,
                loader: async () => redirect("/auth/login")
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "signup",
                element: <RegisterPage />
            },
            {
                path: "logout",
                loader: async () => {
                    Cookies.remove("token");
                    return redirect("/auth/login")
                }
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