import { useQuery } from "@tanstack/react-query";
import { fetchTasksList } from "../api/index.js";

/**
 * Hook to fetch tasks list data from the server.
 *
 * @returns {object} An object containing the tasks list data, loading state, error state, and success state.
 *
 * @example
 * import useFetchTasksList from './useFetchTasksList';
 *
 * function TasksList() {
 *   const { tasksListData, tasksListIsLoading, tasksListIsError, tasksListIsSuccess } = useFetchTasksList();
 *
 *   if (tasksListIsLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (tasksListIsError) {
 *     return <div>Error fetching tasks list</div>;
 *   }
 *
 *   if (tasksListIsSuccess) {
 *     return (
 *       <ul>
 *         {tasksListData.map((task) => (
 *           <li key={task.id}>{task.name}</li>
 *         ))}
 *       </ul>
 *     );
 *   }
 *
 *   return null;
 * }
 */
export default function useFetchTasksList() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTasksList,
        queryKey: ['tasksList'],
        refetchInterval: 60 * 1000
    })

    return { tasksListData: data, tasksListIsLoading: isLoading, tasksListIsError: isError, tasksListIsSuccess: isSuccess }
}