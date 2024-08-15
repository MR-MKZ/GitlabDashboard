// import { useEffect } from "react";

import { useLoginCheck } from "../hooks/UserAuthHook";
// import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import DashboardLayout from "../layouts/DashboardLayout";
import AllTasksComponent from "../components/AllTasksComponent";

export default function TasksPage() {
    const { isDataLoading, isUserFetchSuccess } = useLoginCheck();

    if (isDataLoading) {
        return <Loading />
    }

    if (!isDataLoading && isUserFetchSuccess) {
        return (
            <DashboardLayout>
                <AllTasksComponent />
            </DashboardLayout>
        )
    }
}