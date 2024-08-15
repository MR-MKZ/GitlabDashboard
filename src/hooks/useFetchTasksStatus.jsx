import { useQuery } from "@tanstack/react-query";
import { fetchTasksStatus } from "../api";

/**
 * Hook to fetch tasks status
 *
 * @returns {object} An object containing the tasks status data, loading state, error state, success state, and error message
 *
 * @example
 * import useFetchTasksStatus from './useFetchTasksStatus';
 *
 * const {
 *   tasksStatusData,
 *   tasksStatusIsLoading,
 *   tasksStatusIsError,
 *   tasksStatusIsSuccess,
 *   tasksStatusError
 * } = useFetchTasksStatus();
 *
 * if (tasksStatusIsLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (tasksStatusIsError) {
 *   return <div>Error: {tasksStatusError.message}</div>;
 * }
 *
 * if (tasksStatusIsSuccess) {
 *   return <div>Tasks status: {tasksStatusData}</div>;
 * }
 */
export default function useFetchTasksStatus() {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryFn: fetchTasksStatus,
        queryKey: ['tasksStatus'],
        refetchInterval: 60 * 1000
    })

    return {
        tasksStatusData: data,
        tasksStatusIsLoading: isLoading,
        tasksStatusIsError: isError,
        tasksStatusIsSuccess: isSuccess,
        tasksStatusError: error 
    }
}