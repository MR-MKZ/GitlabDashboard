// import libraries
import React, {Suspense} from 'react';

// import icons
import {BiTask} from "react-icons/bi";
import {GoIssueOpened} from "react-icons/go";
import {MdOutlineAccessTime} from "react-icons/md";

// import hooks
import {useLoginCheck} from '../hooks/UserAuthHook';
import useFetchDashboardOverview from '../hooks/useFetchDashboardOverview';

// import helpers
import {timeConverter} from '../utils/timeConverter';

// import components
import Loading from "../components/Loading";
import ComponentLoaderSkeleton from "../components/ComponentLoaderSkeleton.jsx";

const NavBar = React.lazy(() => import('../components/NavBar.jsx'));
const DashboardOverviewCard = React.lazy(() => import("../components/DashboardOverviewCard.jsx"))
const TasksPieChartComponent = React.lazy(() => import("../components/TasksPieChartComponent"))
const IssuesPieChartComponent = React.lazy(() => import("../components/IssuesPieChartComponent.jsx"))
const IssuesTotalTimeComponent = React.lazy(() => import("../components/IssuesTotalTimeChartComponent.jsx"))
const TopUsersChartComponent = React.lazy(() => import("../components/TopUsersChartComponent.jsx"))
const TasksActivityChartComponent = React.lazy(() => import("../components/TasksActivityChartComponent.jsx"))
const ClosedIssuesWeeklyChartComponent = React.lazy(() => import("../components/ClosedIssuesWeeklyChartComponent.jsx"))
const ContributorsListComponent = React.lazy(() => import("../components/ContributorsListComponent.jsx"))

export default function DashboardPage() {

    const {userData, isDataLoading, isUserFetchSuccess} = useLoginCheck();

    const {dashboardOverviewData, dashboardOverviewIsLoading, dashboardOverviewIsSuccess} = useFetchDashboardOverview();

    let desktopMainContainerStyle = " lg:grid lg:grid-cols-[1fr_75px] lg:overflow-hidden dir-rtl lg:outline-gray-borders lg:outline-2 lg:outline lg:rounded-xl lg:pt-0"
    let desktopNavBarContainerStyle = "lg:w-[75px] lg:h-[calc(100vh-1rem)] lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl dir-ltr lg:left-0"
    let desktopContentContainerStyle = "lg:h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-7 lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl dir-ltr lg:border-l-2 lg:border-l-gray-borders lg:mt-0"

    if (isDataLoading) {
        return <Loading/>
    }

    return (
        <div
            className={`${isDataLoading || !isUserFetchSuccess && "invisible"} relative sm:overflow-x-hidden m-2 pt-[80px] ${desktopMainContainerStyle}`}>
            {/* left nav bar */}
            <div
                className={`bg-gray-primary w-full h-[70px] box-border top-0 rounded-lg absolute ${desktopNavBarContainerStyle}`}>
                <NavBar/>
            </div>
            {/* content container */}
            <div
                className={`bg-black-primary w-full overflow-x-hidden box-border rounded-lg h-max text-white p-3 ${desktopContentContainerStyle}`}>
                {/* Welcome Title */}
                <div>
                    <h2 className='text-2xl'>Hey there, {isDataLoading ? "..." : userData?.username}!</h2>
                    <p className='text-base text-gray-400'>Welcome back, we&apos;re happy to have you here!</p>
                </div>
                {/* Dashboard overview */}
                <div className='mt-6 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <DashboardOverviewCard icon={<BiTask size={30} color='white'/>}
                                           overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? dashboardOverviewData.taskCount : 0}
                                           overviewTitle={"Total Tasks"}/>
                    <DashboardOverviewCard icon={<GoIssueOpened size={30} color='white'/>}
                                           overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? dashboardOverviewData.issueCount : 0}
                                           overviewTitle={"Total Issues"}/>
                    <DashboardOverviewCard icon={<MdOutlineAccessTime size={30} color='white'/>}
                                           overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? timeConverter(dashboardOverviewData.totalTimeSpent) : 0}
                                           overviewTitle={"Total Time Spent"}/>
                </div>
                <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"}>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <TasksPieChartComponent/>
                    </Suspense>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <IssuesPieChartComponent/>
                    </Suspense>
                </div>
                <div className={"mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <IssuesTotalTimeComponent/>
                    </Suspense>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <TopUsersChartComponent/>
                    </Suspense>
                </div>
                <div className={"mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6"}>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <TasksActivityChartComponent/>
                    </Suspense>
                    <Suspense fallback={<ComponentLoaderSkeleton/>}>
                        <ClosedIssuesWeeklyChartComponent/>
                    </Suspense>
                </div>
                <div className={"mt-6 grid grid-cols-1 gap-6"}>
                    <Suspense fallback={<ComponentLoaderSkeleton />}>
                        <ContributorsListComponent/>
                    </Suspense>
                </div>
            </div>
        </div>
    )
}