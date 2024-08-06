import { useQuery } from "@tanstack/react-query";
import { fetchClosedIssuesPerWeek } from "../api";

export default function useFetchClosedIssuesPerWeek() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchClosedIssuesPerWeek,
        queryKey: ['closedIssuesPerWeek']
    })

    return { closedIssuesData: data, closedIssuesIsLoading: isLoading, closedIssuesIsError: isError, closedIssuesIsSuccess: isSuccess }
}