import { useQuery } from "@tanstack/react-query";
import { fetchUsersData } from "../api";

/**
 * Hook to fetch users data.
 *
 * @returns {object} An object containing the users data, loading state, error state, and success state.
 *
 * @example
 * import useFetchUsersData from './useFetchUsersData';
 *
 * function UsersList() {
 *   const { usersData, usersDataIsLoading, usersDataIsError, usersDataIsSuccess } = useFetchUsersData();
 *
 *   if (usersDataIsLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (usersDataIsError) {
 *     return <div>Error fetching users data</div>;
 *   }
 *
 *   if (usersDataIsSuccess) {
 *     return (
 *       <ul>
 *         {usersData.map((user) => (
 *           <li key={user.id}>{user.name}</li>
 *         ))}
 *       </ul>
 *     );
 *   }
 *
 *   return null;
 * }
 */
export default function useFetchUsersData() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchUsersData,
        queryKey: ["usersData"]
    })

    return { usersData: data, usersDataIsLoading: isLoading, usersDataIsError: isError, usersDataIsSuccess: isSuccess }
}