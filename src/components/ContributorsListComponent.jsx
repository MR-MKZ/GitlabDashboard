import { Badge } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import useFetchUsersData from "../hooks/useFetchUsersData"

export default function ContributorsListComponent() {

    const { usersData, usersDataIsLoading, usersDataIsSuccess } = useFetchUsersData();

    return (
        <div
            className={"bg-gray-primary items-center lg:items-stretch border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-col lg:justify-between"}>
            <h1 className="text-white text-xl mb-4">Contributors List</h1>
            <div className="space-y-4 w-full">
                {!usersDataIsLoading && usersDataIsSuccess || usersData ? usersData.map((user, index) => {
                    return (
                        <div key={index}
                            className="bg-gray-secondary rounded-lg p-4 flex gap-3 flex-col md:flex-row items-start md:items-center md:justify-between w-full">
                            <div className={"flex gap-3"}>
                                <img src={user.avatar_url} alt={user.name} className="w-12 h-12 rounded-full" />
                                <div className="flex-grow">
                                    <div className="text-white font-semibold">{user.name}</div>
                                    <div className="text-gray-400 text-sm">@{user.username}</div>
                                </div>
                            </div>
                            <Badge color={"success"} size={"sm"} icon={HiCheck} className={"mx-auto md:mx-0"}>
                                {user.tasksComplete} Finished task
                            </Badge>
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