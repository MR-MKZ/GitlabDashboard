import { useQuery } from "@tanstack/react-query";
import { fetchTasksCountByDate } from "../api";

/**
 * A custom hook that fetches the count of tasks by date using the react-query library.
 * The data is refreshed every 60 seconds.
 *
 * @returns {object} An object containing the following properties:
 * - tasksCountData: The data returned from the API, which is an array of objects with the following structure:
 *   { date: string, count: number }
 * - tasksCountIsLoading: A boolean indicating whether the data is currently being loaded.
 * - tasksCountIsError: A boolean indicating whether an error occurred while fetching the data.
 * - tasksCountIsSuccess: A boolean indicating whether the data was successfully fetched.
 *
 * @example
 * import useFetchTasksCountByDate from './useFetchTasksCountByDate'
 *
 * function MyComponent() {
 *   const { tasksCountData, tasksCountIsLoading, tasksCountIsError, tasksCountIsSuccess } = useFetchTasksCountByDate()
 *
 *   if (tasksCountIsLoading) {
 *     return <div>Loading tasks count by date...</div>
 *   }
 *
 *   if (tasksCountIsError) {
 *     return <div>Error fetching tasks count by date.</div>
 *   }
 *
 *   return (
 *     <div>
 *       {tasksCountData.map(taskCount => (
 *         <div key={taskCount.date}>
 *           Date: {taskCount.date}, Count: {taskCount.count}
 *         </div>
 *       ))}
 *     </div>
 *   )
 * }
 */
export default function useFetchTasksCountByDate() {
    const { data, isLoading, isError, isSuccess } = useQuery({
        queryFn: fetchTasksCountByDate,
        queryKey: ['tasksCountByDate'],
        refetchInterval: 60 * 1000
    })

    return { tasksCountData: data, tasksCountIsLoading: isLoading, tasksCountIsError: isError, tasksCountIsSuccess: isSuccess }
}