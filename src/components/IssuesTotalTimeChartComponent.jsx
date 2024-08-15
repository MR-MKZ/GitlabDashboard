import { useEffect, useState } from 'react'
import { Bar } from "react-chartjs-2";
import { useFetchIssueList } from "../hooks/useFetchIssueList.jsx";

export default function IssuesTotalTimeChartComponent() {
    const {issueListData, issueListIsError, issueListIsLoading, issueListIsSuccess} = useFetchIssueList();

    const [data, setData] = useState({
        labels: [],
        datasets: []
    });


    useEffect(() => {
        if (!issueListIsLoading && issueListIsSuccess) {
            let labels = []
            let times = []
            for (const issue of Object.keys(issueListData)) {
                labels.push(issueListData[issue].title)

                let timeSpent = parseFloat((issueListData[issue].timeSpent / 60).toFixed(2))
                times.push(timeSpent)
            }
            setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Issue total time (hours)',
                        backgroundColor: '#1abc9c',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: times,
                    }
                ],
            });
        }
    }, [issueListData, issueListIsLoading, issueListIsSuccess])

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
                    color: 'white'
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
                <h1 className={"text-2xl"}>Issues Total Time</h1>
                {!issueListIsLoading && issueListIsError && !issueListData || data.labels.length === 0 ? (
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