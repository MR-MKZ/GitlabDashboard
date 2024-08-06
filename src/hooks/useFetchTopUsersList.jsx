import { useQuery } from "@tanstack/react-query";
import { fetchTopUsers} from "../api/index.js";

export const useFetchTopUsersList = () => {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTopUsers,
        queryKey: ['topUsers'],
        refetchInterval: 60 * 1000
    })

    return { topUsersData: data, topUsersIsLoading: isLoading, topUsersIsError: isError, topUsersIsSuccess: isSuccess }
}