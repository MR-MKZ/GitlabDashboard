import React, { useEffect, useRef, useState } from 'react';
import { BiTask } from "react-icons/bi";
import { GoIssueOpened } from "react-icons/go";
import { MdOutlineAccessTime } from "react-icons/md";
import Chart from "chart.js/auto";

import { useLoginCheck } from '../hooks/UserAuthHook';
import useFetchDashboardOverview from '../hooks/useFetchDashboardOverview';
import { timeConverter } from '../utils/timeConverter';
import useFetchIssuesStatus from '../hooks/useFetchIssuesStatus';

const NavBar = React.lazy(() => import('../components/NavBar'));
const DashboardOverviewCard = React.lazy(() => import("../components/DashboardOverviewCard"))
const PieChart = React.lazy(() => import("../components/PieChart"))

import { sum, calcPercent } from '../utils/helpers';
import useFetchTasksStatus from '../hooks/useFetchTasksStatus';

export default function DashboardPage() {

    const tasksPieChartRef = useRef(null);
    const tasksPieChartInstanceRef = useRef(null);
    const issuesPieChartRef = useRef(null);
    const issuesPieChartInstanceRef = useRef(null);
    const [issuesTotalCount, setIssuesTotalCount] = useState(0)
    const [tasksTotalCount, setTasksTotalCount] = useState(0)

    const { userData, isDataLoading, isUserFetchSuccess } = useLoginCheck();

    const { dashboardOverviewData, dashboardOverviewIsLoading, dashboardOverviewIsSuccess } = useFetchDashboardOverview();

    const { issuesStatusData, issuesStatusIsLoading, issuesStatusIsSuccess } = useFetchIssuesStatus();
    const { tasksStatusData, tasksStatusIsLoading, tasksStatusIsSuccess } = useFetchTasksStatus();

    useEffect(() => {

        if (tasksPieChartInstanceRef.current) {
            tasksPieChartInstanceRef.current.destroy();
        }

        if (issuesPieChartInstanceRef.current) {
            issuesPieChartInstanceRef.current.destroy();
        }

        // sum([issuesStatusData["closedIssuesCount"], issuesStatusData["openIssuesCount"]])

        if (!issuesStatusIsLoading && issuesStatusIsSuccess) {
            setIssuesTotalCount(sum([issuesStatusData["closedIssuesCount"], issuesStatusData["openIssuesCount"]]))

            const ctx2 = issuesPieChartRef.current.getContext('2d');

            issuesPieChartInstanceRef.current = new Chart(ctx2, {
                type: "pie",
                data: {
                    labels: ["Closed", "Open"],
                    datasets: [{
                        data: [issuesStatusData["closedIssuesCount"], issuesStatusData["openIssuesCount"]],
                        borderWidth: 1,
                        backgroundColor: ["#72b927", "#6100cc"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                font: {
                                    size: 14,
                                },
                                color: "#ffffff",
                            },

                        }
                    }
                }
            })
        }

        if (!tasksStatusIsLoading && tasksStatusIsSuccess) {

            setTasksTotalCount(sum([tasksStatusData["closedTasksCount"], tasksStatusData["openTasksCount"]]))

            const ctx = tasksPieChartRef.current.getContext('2d');

            tasksPieChartInstanceRef.current = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Done", "Todo"],
                    datasets: [{
                        data: [tasksStatusData["closedTasksCount"], tasksStatusData["openTasksCount"]],
                        borderWidth: 1,
                        backgroundColor: ["#0A77FF", "#27B973"]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: "bottom",
                            labels: {
                                font: {
                                    size: 14,
                                },
                                color: "#ffffff",
                            },

                        }
                    }
                }
            })
        }





        return () => {
            if (tasksPieChartInstanceRef.current) {
                tasksPieChartInstanceRef.current.destroy();
            }

            if (issuesPieChartInstanceRef.current) {
                issuesPieChartInstanceRef.current.destroy();
            }
        };
    }, [isUserFetchSuccess, issuesStatusData, issuesStatusIsLoading, issuesStatusIsSuccess, issuesTotalCount, tasksStatusData, tasksStatusIsLoading, tasksStatusIsSuccess]);

    let desktopMainContainerStyle = " lg:grid lg:grid-cols-[1fr_75px] lg:overflow-hidden dir-rtl lg:outline-gray-borders lg:outline-2 lg:outline lg:rounded-xl lg:pt-0"
    let desktopNavBarContainerStyle = "lg:w-[75px] lg:h-[calc(100vh-1rem)] lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl dir-ltr lg:left-0"
    let desktopContentContainerStyle = "lg:h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-7 lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl dir-ltr lg:border-l-2 lg:border-l-gray-borders lg:mt-0"
    return (
        <div className={`relative sm:overflow-x-hidden m-2 pt-[80px] ${desktopMainContainerStyle}`}>
            {/* left nav bar */}
            <div
                className={`bg-gray-primary w-full h-[70px] box-border top-0 rounded-lg absolute ${desktopNavBarContainerStyle}`}>
                <NavBar />
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
                    <DashboardOverviewCard icon={<BiTask size={30} color='white' />} overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? dashboardOverviewData.taskCount : 0}
                        overviewTitle={"Total Tasks"} />
                    <DashboardOverviewCard icon={<GoIssueOpened size={30} color='white' />} overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? dashboardOverviewData.issueCount : 0}
                        overviewTitle={"Total Issues"} />
                    <DashboardOverviewCard icon={<MdOutlineAccessTime size={30} color='white' />} overviewData={!dashboardOverviewIsLoading && dashboardOverviewIsSuccess ? timeConverter(dashboardOverviewData.totalTimeSpent) : 0}
                        overviewTitle={"Total Time Spent"} />
                </div>
                <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"}>
                    <PieChart
                        chartTitle={"Tasks Status"}
                        chartValTitle1={"Finished tasks"}
                        chartVal1={!tasksStatusIsLoading && tasksStatusIsSuccess ? `${calcPercent("ntp", tasksStatusData["closedTasksCount"], tasksTotalCount)}%` : "0%"}
                        chartValTitle2={"Active tasks"}
                        chartVal2={!tasksStatusIsLoading && tasksStatusIsSuccess ? `${calcPercent("ntp", tasksStatusData["openTasksCount"], tasksTotalCount)}%` : "0%"}
                        chartId={"tasksPieChart"}
                        chartRef={tasksPieChartRef}
                    />
                    <PieChart
                        chartTitle={"Issues Status"}
                        chartValTitle1={"Closed issues"}
                        chartVal1={!issuesStatusIsLoading && issuesStatusIsSuccess ? `${calcPercent("ntp", issuesStatusData["closedIssuesCount"], issuesTotalCount)}%` : "0%"}
                        chartValTitle2={"Open issues"}
                        chartVal2={!issuesStatusIsLoading && issuesStatusIsSuccess ? `${calcPercent("ntp", issuesStatusData["openIssuesCount"], issuesTotalCount)}%` : "0%"}
                        chartId={"tasksPieChart"}
                        chartRef={issuesPieChartRef}
                    />
                    {/* <div
                        className={"bg-gray-primary border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-row lg:justify-between"}>
                        <div
                            className={"flex items-center lg:items-start flex-col gap-6 justify-between text-[11pt] sm:text-[14pt] mb-7"}>
                            <h1 className={"text-2xl"}>Issues Status</h1>
                            <div className={"text-center w-max"}>
                                <p className={"text-left"}>Closed issues</p>
                                <span
                                    className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">38%</span>
                            </div>
                            <div className={"text-center w-max"}>
                                <p className={"text-left"}>Open issues</p>
                                <span
                                    className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">62%</span>
                            </div>
                        </div>
                        <div className={"lg:mx-auto"}>
                            <canvas id={"tasksPieChart"} className={"md:w-[350px] md:h-[350px]"}
                                ref={tasksPieChart2Ref}></canvas>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}