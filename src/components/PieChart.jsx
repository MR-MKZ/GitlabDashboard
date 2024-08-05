import PropTypes from 'prop-types'

export default function pieChartComponent({ chartTitle, chartValTitle1, chartValTitle2, chartVal1, chartVal2, chartId, chartRef }) {
    return (
        <div
            className={"bg-gray-primary border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-row lg:justify-between"}>
            <div
                className={"flex items-center lg:items-start flex-col gap-6 justify-between text-[11pt] sm:text-[14pt] mb-7"}>
                <h1 className={"text-2xl"}>{chartTitle}</h1>
                <div className={"text-center w-max"}>
                    <p className={"text-left"}>{chartValTitle1}</p>
                    <span
                        className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{chartVal1}</span>
                </div>
                <div className={"text-center w-max"}>
                    <p className={"text-left"}>{chartValTitle2}</p>
                    <span
                        className="bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">{chartVal2}</span>
                </div>
            </div>
            <div className={"lg:mx-auto"}>
                <canvas id={chartId} className={"md:w-[350px] md:h-[350px]"}
                    ref={chartRef}></canvas>
            </div>
        </div>
    )
}

pieChartComponent.propTypes = {
    chartTitle: PropTypes.string,
    chartValTitle1: PropTypes.string,
    chartValTitle2: PropTypes.string,
    chartVal1: PropTypes.string,
    chartVal2: PropTypes.string,
    chartId: PropTypes.string,
    chartRef: PropTypes.object
}