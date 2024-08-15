import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { useFetchTopUsersList } from "../hooks/useFetchTopUsersList.jsx";

export default function TopUsersChartComponent() {
    const {topUsersData, topUsersIsSuccess, topUsersIsLoading, topUsersIsError} = useFetchTopUsersList();

    const [data, setData] = useState({
        labels: [],
        datasets: []
    });


    useEffect(() => {
        if (!topUsersIsLoading && topUsersIsSuccess) {
            let labels = []
            let tasksCompleted = []
            for (const user of Object.keys(topUsersData)) {
                labels.push(topUsersData[user].username)
                tasksCompleted.push(topUsersData[user].taskCompleted)
            }
            setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Completed tasks',
                        backgroundColor: '#9b59b6',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: tasksCompleted,
                    }
                ],
            });
        }
    }, [topUsersData, topUsersIsLoading, topUsersIsSuccess])

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white'
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: 'white',
                    callback: function (value) {
                        return Number.isInteger(value) ? value : '';
                    }
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        animation: {
            x: {
                duration: 500,
                easing: 'easeOut'
            },
            y: {
                duration: 500,
                easing: 'easeOut'
            },
        },
    };

    return (
        <div
            className={"bg-gray-primary items-center lg:items-stretch border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-row lg:justify-between"}>
            <div className={"flex items-center lg:items-start flex-col w-full gap-6 text-[11pt] sm:text-[14pt]"}>
                <h1 className={"text-2xl"}>Top Users</h1>
                {!topUsersIsLoading && topUsersIsError && !topUsersData || data.labels.length === 0 ? (
                    <p className={"w-full h-[270px] flex items-center justify-center"}>
                        Sorry, but there is nothing to show yet!
                    </p>
                ) : (
                    <Bar data={data} options={options} color={"white"}/>
                )}
            </div>
        </div>
    )
}
