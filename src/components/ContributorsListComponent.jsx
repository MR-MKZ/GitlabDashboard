import { Badge } from "flowbite-react";
import { HiCheck } from "react-icons/hi";

export default function ContributorsListComponent() {
    const users = [
        {
            avatar: 'https://secure.gravatar.com/avatar/d44064da1d3066dad109b04176b84af94368f6ec72048f4392a07bf195b843fe?s=80&d=identicon',
            name: 'John Doe',
            username: '@johndoe',
            completedTasks: 5,
        },
        {
            avatar: 'https://secure.gravatar.com/avatar/d44064da1d3066dad109b04176b84af94368f6ec72048f4392a07bf195b843fe?s=80&d=identicon',
            name: 'Jane Smith',
            username: '@janesmith',
            completedTasks: 8,
        },
        {
            avatar: 'https://secure.gravatar.com/avatar/d44064da1d3066dad109b04176b84af94368f6ec72048f4392a07bf195b843fe?s=80&d=identicon',
            name: 'Alice Johnson',
            username: '@alicejohnson',
            completedTasks: 1342,
        },
        {
            avatar: 'https://secure.gravatar.com/avatar/d44064da1d3066dad109b04176b84af94368f6ec72048f4392a07bf195b843fe?s=80&d=identicon',
            name: 'Bob Brown',
            username: '@bobbrown',
            completedTasks: 7,
        },
    ];

    return (
        <div
            className={"bg-gray-primary items-center lg:items-stretch border border-gray-borders rounded-lg p-5 gap-3 flex flex-col lg:flex-col lg:justify-between"}>
            <h1 className="text-white text-xl mb-4">Contributors List</h1>
            <div className="space-y-4 w-full">
                {users.map((user, index) => (
                    <div key={index}
                         className="bg-gray-secondary rounded-lg p-4 flex gap-3 flex-col md:flex-row items-start md:items-center md:justify-between w-full">
                        <div className={"flex gap-3"}>
                            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full"/>
                            <div className="flex-grow">
                                <div className="text-white font-semibold">{user.name}</div>
                                <div className="text-gray-400 text-sm">{user.username}</div>
                            </div>
                        </div>
                        <Badge color={"success"} size={"sm"} icon={HiCheck} className={"mx-auto md:mx-0"}>
                            {user.completedTasks} Finished task
                        </Badge>
                    </div>
                ))}
            </div>
        </div>
    )
}