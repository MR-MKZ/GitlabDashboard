import { useQuery } from "@tanstack/react-query";
import { fetchUsersData } from "../api";

export default function useFetchUsersData() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchUsersData,
        queryKey: ["usersData"]
    })

    return { usersData: data, usersDataIsLoading: isLoading, usersDataIsError: isError, usersDataIsSuccess: isSuccess }
}