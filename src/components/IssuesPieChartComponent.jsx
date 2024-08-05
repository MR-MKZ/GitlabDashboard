// import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react';
import { calcPercent, sum } from "../utils/helpers.js";
import useFetchIssuesStatus from "../hooks/useFetchIssuesStatus.jsx";
import Chart from "chart.js/auto";
import PieChart from "./PieChart.jsx"


export default function IssuesPieChartComponent() {
    const issuesPieChartRef = useRef(null);
    const issuesPieChartInstanceRef = useRef(null);

    const [issuesTotalCount, setIssuesTotalCount] = useState(0)

    const {issuesStatusData, issuesStatusIsLoading, issuesStatusIsSuccess} = useFetchIssuesStatus();

    useEffect(() => {
        if (issuesPieChartInstanceRef.current) {
            issuesPieChartInstanceRef.current.destroy();
        }

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
                        backgroundColor: ["#3498db", "#f1c40f"]
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
            if (issuesPieChartInstanceRef.current) {
                issuesPieChartInstanceRef.current.destroy();
            }
        }
    }, [issuesStatusData, issuesStatusIsLoading, issuesStatusIsSuccess, issuesTotalCount]);

    return (
        <PieChart
            chartTitle={"Issues Status"}
            chartValTitle1={"Closed issues"}
            chartVal1={!issuesStatusIsLoading && issuesStatusIsSuccess ? `${calcPercent("ntp", issuesStatusData["closedIssuesCount"], issuesTotalCount)}%` : "0%"}
            chartValTitle2={"Open issues"}
            chartVal2={!issuesStatusIsLoading && issuesStatusIsSuccess ? `${calcPercent("ntp", issuesStatusData["openIssuesCount"], issuesTotalCount)}%` : "0%"}
            chartId={"tasksPieChart"}
            chartRef={issuesPieChartRef}
        />
    )
}

IssuesPieChartComponent.propTypes = {}