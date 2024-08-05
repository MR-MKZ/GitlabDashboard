import { useQuery } from "@tanstack/react-query";
import { fetchTasksStatus } from "../api";


export default function useFetchTasksStatus() {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryFn: fetchTasksStatus,
        queryKey: ['tasksStatus']
    })

    return {
        tasksStatusData: data,
        tasksStatusIsLoading: isLoading,
        tasksStatusIsError: isError,
        tasksStatusIsSuccess: isSuccess,
        tasksStatusError: error 
    }
}