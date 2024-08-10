import { useQuery } from "@tanstack/react-query";
import { fetchClosedIssuesPerWeek } from "../api";

/**
 * Hook to fetch closed issues per week.
 *
 * This hook uses `useQuery` to fetch closed issues per week and returns the data, loading state, error state, and success state.
 *
 * @returns {object} An object containing the following properties:
 *   - `closedIssuesData`: The fetched closed issues per week data.
 *   - `closedIssuesIsLoading`: A boolean indicating whether the data is being fetched.
 *   - `closedIssuesIsError`: A boolean indicating whether an error occurred while fetching the data.
 *   - `closedIssuesIsSuccess`: A boolean indicating whether the data was fetched successfully.
 *
 * Example:
 * ```
 * import React from 'react';
 * import useFetchClosedIssuesPerWeek from './useFetchClosedIssuesPerWeek';
 *
 * function App() {
 *   const { closedIssuesData, closedIssuesIsLoading, closedIssuesIsError, closedIssuesIsSuccess } = useFetchClosedIssuesPerWeek();
 *
 *   if (closedIssuesIsLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (closedIssuesIsError) {
 *     return <div>Error: {closedIssuesIsError.message}</div>;
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Closed Issues per Week</h1>
 *       <ul>
 *         {closedIssuesData.map((issue) => (
 *           <li key={issue.id}>{issue.title}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export default function useFetchClosedIssuesPerWeek() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchClosedIssuesPerWeek,
        queryKey: ['closedIssuesPerWeek']
    })

    return { closedIssuesData: data, closedIssuesIsLoading: isLoading, closedIssuesIsError: isError, closedIssuesIsSuccess: isSuccess }
}