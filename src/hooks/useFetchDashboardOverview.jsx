import { useQuery } from "@tanstack/react-query";
import { fetchDashboardOverviewData } from "../api";

/**
 * Hook to fetch dashboard overview data.
 *
 * @returns {object} An object containing the dashboard overview data, loading state, error state, and error message.
 *
 * @example
 * import useFetchDashboardOverview from './useFetchDashboardOverview';
 *
 * const {
 *   dashboardOverviewData,
 *   dashboardOverviewIsLoading,
 *   dashboardOverviewIsError,
 *   dashboardOverviewIsSuccess,
 *   dashboardOverviewError
 * } = useFetchDashboardOverview();
 *
 * if (dashboardOverviewIsLoading) {
 *   return <div>Loading...</div>;
 * }
 *
 * if (dashboardOverviewIsError) {
 *   return <div>Error: {dashboardOverviewError.message}</div>;
 * }
 *
 * return (
 *   <div>
 *     <h1>Dashboard Overview</h1>
 *     <ul>
 *       {dashboardOverviewData.map((item) => (
 *         <li key={item.id}>{item.name}</li>
 *       ))}
 *     </ul>
 *   </div>
 * );
 */
export default function useFetchDashboardOverview() {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryFn: fetchDashboardOverviewData,
        queryKey: ['dashboardOverviewCard'],
        refetchInterval: 60 * 1000
    })

    return {
        dashboardOverviewData: data,
        dashboardOverviewIsLoading: isLoading,
        dashboardOverviewIsError: isError,
        dashboardOverviewIsSuccess: isSuccess,
        dashboardOverviewError: error 
    }
}