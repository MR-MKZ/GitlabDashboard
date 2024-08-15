import { useQuery } from "@tanstack/react-query";
import { fetchTopUsers} from "../api/index.js";

/**
 * Hook to fetch the top users list.
 *
 * This hook uses `useQuery` to fetch the top users list from the server.
 * The data is refetched every 60 seconds.
 *
 * @returns {object} An object with the following properties:
 * - `topUsersData`: The fetched top users list data.
 * - `topUsersIsLoading`: A boolean indicating whether the data is being fetched.
 * - `topUsersIsError`: A boolean indicating whether an error occurred while fetching the data.
 * - `topUsersIsSuccess`: A boolean indicating whether the data was fetched successfully.
 *
 * @example
 * ```
 * import React from 'react';
 * import { useFetchTopUsersList } from './useFetchTopUsersList';
 *
 * const TopUsersList = () => {
 *   const { topUsersData, topUsersIsLoading, topUsersIsError } = useFetchTopUsersList();
 *
 *   if (topUsersIsLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (topUsersIsError) {
 *     return <div>Error fetching top users list</div>;
 *   }
 *
 *   return (
 *     <ul>
 *       {topUsersData.map((user) => (
 *         <li key={user.id}>{user.name}</li>
 *       ))}
 *     </ul>
 *   );
 * };
 * ```
 */
export const useFetchTopUsersList = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTopUsers,
        queryKey: ['topUsers'],
        refetchInterval: 60 * 1000
    })

    return { topUsersData: data, topUsersIsLoading: isLoading, topUsersIsError: isError, topUsersIsSuccess: isSuccess }
}