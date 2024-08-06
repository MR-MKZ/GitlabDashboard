import { Bar } from "react-chartjs-2";
import useFetchClosedIssuesPerWeek from "../hooks/useFetchClosedIssuesPerWeek"
import { useState, useEffect } from "react";
import { getWeekRange } from "../utils/helpers";

export default function ClosedIssuesWeeklyChartComponent() {
    // const data = [
    //     { week: 'Sep 30 - Oct 6', closedIssues: 5 },
    //     { week: 'Oct 7 - Oct 13', closedIssues: 8 },
    //     { week: 'Oct 14 - Oct 20', closedIssues: 12 },
    //     { week: 'Oct 21 - Oct 27', closedIssues: 7 },
    // ];

    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    const { closedIssuesData, closedIssuesIsLoading, closedIssuesIsError, closedIssuesIsSuccess } = useFetchClosedIssuesPerWeek();

    // const chartData = 

    useEffect(() => {
        if (!closedIssuesIsLoading && closedIssuesIsSuccess) {
            let labels = [];
            let closedIssues = [];

            for (let week of Object.keys(closedIssuesData)) {
                labels.push(getWeekRange(closedIssuesData[week]["week"]));
                closedIssues.push(closedIssuesData[week]["closedIssues"])
            }

            setData({
                labels: labels, // Use the week label with date range
                datasets: [
                    {
                        label: 'Issues Closed',
                        data: closedIssues,
                        backgroundColor: '#2ecc71', // Light Green Color
                    },
                ],
            })

            // console.log(closedIssues);
        }
    }, [closedIssuesData, closedIssuesIsLoading, closedIssuesIsSuccess]);

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
                <h1 className={"text-2xl"}>Recent closed issues</h1>
                {!closedIssuesIsLoading && closedIssuesIsError && !closedIssuesData || data.labels.length === 0 ? (
                    <p className={"w-full h-[270px] flex items-center justify-center"}>
                        Sorry, but there is nothing to show yet!
                    </p>
                ) : (
                    <Bar data={data} options={options} />
                    )}
            </div>
        </div>
    )
        ;
}