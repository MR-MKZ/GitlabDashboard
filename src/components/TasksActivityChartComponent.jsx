import { Line } from 'react-chartjs-2';
import useFetchTasksCountByDate from '../hooks/useFetchTasksCountByDate';
import { useState, useEffect } from 'react';

export default function TasksActivityChartComponent() {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    })

    const { tasksCountData, tasksCountIsLoading, tasksCountIsError, tasksCountIsSuccess } = useFetchTasksCountByDate();

    useEffect(() => {
        if (!tasksCountIsLoading && tasksCountIsSuccess) {
            let labels = [];
            let tasks = [];

            for (const date of Object.keys(tasksCountData)) {
                labels.push(tasksCountData[date]["date"])
                tasks.push(tasksCountData[date]["taskDoneNumber"])
            }

            setData({
                labels: labels,
                datasets: [
                    {
                        label: 'Finished Tasks',
                        data: tasks,
                        fill: false,
                        borderColor: '#3498db',
                        tension: 0.1,
                    }
                ],
            });
        }
    }, [tasksCountData, tasksCountIsLoading, tasksCountIsSuccess]);
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
                    precision: 0
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
                <h1 className={"text-2xl"}>Recent finished tasks</h1>
                {!tasksCountIsLoading && tasksCountIsError && !tasksCountData || data.labels.length === 0 ? (
                    <p className={"w-full h-[270px] flex items-center justify-center"}>
                        Sorry, but there is nothing to show yet!
                    </p>
                ) : (
                    <Line data={data} options={options} />
                )}
            </div>
        </div>
    );
}