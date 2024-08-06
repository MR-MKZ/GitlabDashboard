import { useQuery } from "@tanstack/react-query";
import { fetchTasksCountByDate } from "../api";

export default function useFetchTasksCountByDate() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTasksCountByDate,
        queryKey: ['tasksCountByDate'],
        refetchInterval: 60 * 1000
    })

    return { tasksCountData: data, tasksCountIsLoading: isLoading, tasksCountIsError: isError, tasksCountIsSuccess: isSuccess }
}