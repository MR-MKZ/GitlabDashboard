import { useQuery } from "@tanstack/react-query";
import { fetchTasksList } from "../api/index.js";

export default function useFetchTasksList() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTasksList,
        queryKey: ['tasksList'],
        refetchInterval: 60 * 1000
    })

    return { tasksListData: data, tasksListIsLoading: isLoading, tasksListIsError: isError, tasksListIsSuccess: isSuccess }
}