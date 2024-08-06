import { useQuery } from "@tanstack/react-query";
import { fetchTasksStatus } from "../api";


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