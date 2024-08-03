import React, {useEffect, useRef} from 'react';
import {BiTask} from "react-icons/bi";
import {GoIssueOpened} from "react-icons/go";
import {MdOutlineAccessTime} from "react-icons/md";
import Chart from "chart.js/auto";

import {useLoginCheck} from '../hooks/UserAuthHook';

const NavBar = React.lazy(() => import('../components/NavBar'));
const DashboardOverviewCard = React.lazy(() => import("../components/DashboardOverviewCard"))

export default function DashboardPage() {

    const tasksPieChartRef = useRef(null);
    const tasksPieChartInstanceRef = useRef(null);
    const tasksPieChart2Ref = useRef(null);
    const tasksPieChartInstance2Ref = useRef(null);

    const {userData, isDataLoading, isUserFetchSuccess} = useLoginCheck();

    useEffect(() => {
        if (tasksPieChartInstanceRef.current) {
            tasksPieChartInstanceRef.current.destroy();
        }

        if (tasksPieChartInstance2Ref.current) {
            tasksPieChartInstance2Ref.current.destroy();
        }

        const ctx = tasksPieChartRef.current.getContext('2d');

        tasksPieChartInstanceRef.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: ["Done", "Todo"],
                datasets: [{
                    data: [49, 21],
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

        const ctx2 = tasksPieChart2Ref.current.getContext('2d');

        tasksPieChartInstance2Ref.current = new Chart(ctx2, {
            type: "pie",
            data: {
                labels: ["Closed", "Open"],
                datasets: [{
                    data: [38, 62],
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

        return () => {
            if (tasksPieChartInstanceRef.current) {
                tasksPieChartInstanceRef.current.destroy();
            }

            if (tasksPieChartInstance2Ref.current) {
                tasksPieChartInstance2Ref.current.destroy();
            }
        };
    }, [isUserFetchSuccess]);

    let desktopMainContainerStyle = " lg:grid lg:grid-cols-[1fr_75px] lg:overflow-hidden dir-rtl lg:outline-gray-borders lg:outline-2 lg:outline lg:rounded-xl lg:pt-0"
    let desktopNavBarContainerStyle = "lg:w-[75px] lg:h-[calc(100vh-1rem)] lg:rounded-none lg:rounded-tl-xl lg:rounded-bl-xl dir-ltr lg:left-0"
    let desktopContentContainerStyle = "lg:h-[calc(100vh-1rem)] lg:overflow-y-auto lg:p-7 lg:rounded-none lg:rounded-tr-xl lg:rounded-br-xl dir-ltr lg:border-l-2 lg:border-l-gray-borders lg:mt-0"
    return (
        <div className={`relative sm:overflow-x-hidden m-2 pt-[80px] ${desktopMainContainerStyle}`}>
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
                    <DashboardOverviewCard icon={<BiTask size={30} color='white'/>} overviewData={420}
                                           overviewTitle={"Total Tasks"}/>
                    <DashboardOverviewCard icon={<GoIssueOpened size={30} color='white'/>} overviewData={302}
                                           overviewTitle={"Total Issues"}/>
                    <DashboardOverviewCard icon={<MdOutlineAccessTime size={30} color='white'/>} overviewData={"1D 12H"}
                                           overviewTitle={"Total Time Spent"}/>
                </div>
                <div className={"mt-6 grid grid-cols-1 md:grid-cols-2 gap-6"}>
                    <div
                        className={"bg-gray-primary border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-row lg:justify-between"}>
                        <div
                            className={"flex items-center lg:items-start flex-col gap-6 justify-between text-[11pt] sm:text-[14pt] mb-7"}>
                            <h1 className={"text-2xl"}>Tasks Status</h1>
                            <div className={"text-center w-max"}>
                                <p className={"text-left"}>Finished tasks</p>
                                <span
                                    className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">70%</span>
                            </div>
                            <div className={"text-center w-max"}>
                                <p className={"text-left"}>Active tasks</p>
                                <span
                                    className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">30%</span>
                            </div>
                        </div>
                        <div className={"lg:mx-auto"}>
                            <canvas id={"tasksPieChart"} className={"md:w-[350px] md:h-[350px]"}
                                    ref={tasksPieChartRef}></canvas>
                        </div>
                    </div>
                    <div
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
                    </div>
                </div>
            </div>
        </div>
    )
}