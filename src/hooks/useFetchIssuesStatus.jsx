import { useQuery } from "@tanstack/react-query";
import { fetchIssuesStatus } from "../api";


export default function useFetchIssuesStatus() {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryFn: fetchIssuesStatus,
        queryKey: ['issuesStatus'],
        refetchInterval: 60 * 1000
    })

    return {
        issuesStatusData: data,
        issuesStatusIsLoading: isLoading,
        issuesStatusIsError: isError,
        issuesStatusIsSuccess: isSuccess,
        issuesStatusError: error 
    }
}