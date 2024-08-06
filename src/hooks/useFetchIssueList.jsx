import { useQuery } from "@tanstack/react-query";
import { fetchIssueList } from "../api/index.js";

export const useFetchIssueList = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchIssueList,
        queryKey: ['issueList'],
        refetchInterval: 60 * 1000
    })

    return { issueListData: data, issueListIsLoading: isLoading, issueListIsError: isError, issueListIsSuccess: isSuccess }
}