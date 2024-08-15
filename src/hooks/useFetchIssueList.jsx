import { useQuery } from "@tanstack/react-query";
import { fetchIssueList } from "../api/index.js";

/**
 * A custom hook that fetches issue list using the `useQuery` hook from the `react-query` library.
 * It fetches the issue list from the `fetchIssueList` function and automatically refetches the data every 60 seconds.
 *
 * @returns {object} An object containing the following properties:
 * - `issueListData`: The fetched issue list data. It will be `undefined` if the request is still loading or if there was an error.
 * - `issueListIsLoading`: A flag indicating if the request is currently loading.
 * - `issueListIsError`: A flag indicating if there was an error while fetching the data.
 * - `issueListIsSuccess`: A flag indicating if the request was successful.
 *
 * @example
 * import { useFetchIssueList } from './useFetchIssueList';
 *
 * const IssueListComponent = () => {
 *   const { issueListData, issueListIsLoading, issueListIsError, issueListIsSuccess } = useFetchIssueList();
 *
 *   if (issueListIsLoading) {
 *     return <div>Loading issue list...</div>;
 *   }
 *
 *   if (issueListIsError) {
 *     return <div>Error fetching issue list!</div>;
 *   }
 *
 *   return (
 *     <ul>
 *       {issueListData.map(issue => (
 *         <li key={issue.id}>{issue.title}</li>
 *       ))}
 *     </ul>
 *   );
 * };
 */
export const useFetchIssueList = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchIssueList,
        queryKey: ['issueList'],
        refetchInterval: 60 * 1000
    })

    return { issueListData: data, issueListIsLoading: isLoading, issueListIsError: isError, issueListIsSuccess: isSuccess }
}