import { useQuery } from "@tanstack/react-query";
import { fetchIssuesStatus } from "../api";

/**
 * Hook to fetch issues status data.
 *
 * @returns {object} An object containing the issues status data, loading state, error state, success state, and error message.
 *
 * @example
 * import useFetchIssuesStatus from './useFetchIssuesStatus';
 *
 * function IssuesStatusComponent() {
 *   const {
 *     issuesStatusData,
 *     issuesStatusIsLoading,
 *     issuesStatusIsError,
 *     issuesStatusIsSuccess,
 *     issuesStatusError
 *   } = useFetchIssuesStatus();
 *
 *   if (issuesStatusIsLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (issuesStatusIsError) {
 *     return <div>Error: {issuesStatusError.message}</div>;
 *   }
 *
 *   if (issuesStatusIsSuccess) {
 *     return <div>Issues Status: {issuesStatusData}</div>;
 *   }
 *
 *   return null;
 * }
 */
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