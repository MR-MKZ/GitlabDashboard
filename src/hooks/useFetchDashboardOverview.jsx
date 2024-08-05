import { useQuery } from "@tanstack/react-query";
import { fetchDashboardOverviewData } from "../api";


export default function useFetchDashboardOverview() {
    const { data, isLoading, isError, isSuccess, error } = useQuery({
        queryFn: fetchDashboardOverviewData,
        queryKey: ['dashboardOverviewCard']
    })

    return {
        dashboardOverviewData: data,
        dashboardOverviewIsLoading: isLoading,
        dashboardOverviewIsError: isError,
        dashboardOverviewIsSuccess: isSuccess,
        dashboardOverviewError: error 
    }
}