import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";
import useFetchTasksList from "../hooks/useFetchTasksList";

export default function AllTasksComponent() {

    const { tasksListData, tasksListIsLoading, tasksListIsSuccess } = useFetchTasksList()

    return (
        <div
            className={"bg-gray-primary items-center lg:items-stretch border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-col lg:justify-between"}>
            <h1 className="text-white text-xl mb-4">All Tasks</h1>
            <div className="space-y-4 w-full">
                {!tasksListIsLoading && tasksListIsSuccess || tasksListData ? tasksListData.map((task, index) => {
                    console.log(tasksListData);
                    return (
                        <div key={index}
                            className="bg-gray-secondary rounded-lg p-4 flex gap-3 flex-col md:flex-row md:items-center md:justify-between w-full">
                            <div className={"flex gap-3 mx-auto md:mx-0"}>
                                <div className="flex-grow text-center md:text-left">
                                    <div className="text-white font-semibold">{task.description}</div>
                                    <div className="text-gray-400 text-sm">@{task.username}</div>
                                </div>
                            </div>
                            {!task.doneAt ? (
                                <>
                                    <Badge color={"warning"} size={"sm"} icon={HiClock} className={"mx-auto md:mx-0"}>
                                        {task.tasksComplete} Active
                                    </Badge>
                                </>
                            ) : (
                                <>
                                    <Badge color={"success"} size={"sm"} icon={HiCheck} className={"mx-auto md:mx-0"}>
                                        {task.tasksComplete} Done
                                    </Badge>
                                </>
                            )}

                        </div>
                    )
                }) : (
                    <p className={"w-full h-[270px] flex items-center justify-center"}>
                        Sorry, but there is nothing to show yet!
                    </p>
                )}
            </div>
        </div>
    )
}