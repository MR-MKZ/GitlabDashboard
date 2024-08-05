// import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';
import { calcPercent, sum } from "../utils/helpers.js";
import useFetchTasksStatus from "../hooks/useFetchTasksStatus.jsx";
import Chart from "chart.js/auto";
import PieChart from "./PieChart.jsx"


export default function TasksPieChartComponent() {
    const tasksPieChartRef = useRef(null);
    const tasksPieChartInstanceRef = useRef(null);

    const [tasksTotalCount, setTasksTotalCount] = useState(0)

    const {tasksStatusData, tasksStatusIsLoading, tasksStatusIsSuccess} = useFetchTasksStatus();

    useEffect(() => {

        if (tasksPieChartInstanceRef.current) {
            tasksPieChartInstanceRef.current.destroy();
        }

        if (!tasksStatusIsLoading && tasksStatusIsSuccess) {

            setTasksTotalCount(sum([tasksStatusData["closedTasksCount"], tasksStatusData["openTasksCount"]]))

            const ctx = tasksPieChartRef.current.getContext('2d');

            tasksPieChartInstanceRef.current = new Chart(ctx, {
                type: "pie",
                data: {
                    labels: ["Finished", "Active"],
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
        };
    }, [tasksStatusData, tasksStatusIsLoading, tasksStatusIsSuccess]);

    return (
        <PieChart
            chartTitle={"Tasks Status"}
            chartValTitle1={"Finished tasks"}
            chartVal1={!tasksStatusIsLoading && tasksStatusIsSuccess ? `${calcPercent("ntp", tasksStatusData["closedTasksCount"], tasksTotalCount)}%` : "0%"}
            chartValTitle2={"Active tasks"}
            chartVal2={!tasksStatusIsLoading && tasksStatusIsSuccess ? `${calcPercent("ntp", tasksStatusData["openTasksCount"], tasksTotalCount)}%` : "0%"}
            chartId={"tasksPieChart"}
            chartRef={tasksPieChartRef}
        />
    )
}

TasksPieChartComponent.propTypes = {}