import { useEffect } from "react";

import { useLoginCheck } from "../hooks/UserAuthHook";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import DashboardLayout from "../layouts/DashboardLayout";
import AllTasksComponent from "../components/AllTasksComponent";

export default function TasksPage() {
    const { userData, isDataLoading, isUserFetchSuccess } = useLoginCheck();

    // const navigate = useNavigate();

    // useEffect(() => {
    //     if (!isDataLoading && isUserFetchSuccess && userData.role.toLowerCase() == "user") {
    //         navigate("/")
    //     }
    // }, [isDataLoading, isUserFetchSuccess, navigate, userData]);

    if (isDataLoading) {
        return <Loading />
    }

    return (
        <DashboardLayout isDataLoading={isDataLoading} isUserFetchSuccess={isUserFetchSuccess}>
            <AllTasksComponent />
        </DashboardLayout>
    )
}