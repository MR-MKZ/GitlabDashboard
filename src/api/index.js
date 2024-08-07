import axios from "axios";
import Cookies from "js-cookie";

// User apis

const api_url = import.meta.env.VITE_API_URL;

let token = Cookies.get("token")

const request_config = {
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
    "Authorization": token
  }
}

/**
 * register user
 * @param {string} username username
 * @param {string} email email
 * @param {string} password password
 * @param {string} role admin | user
 * @returns {Promise<object>} user data
 */
export const createUser = async ({ username, email, password, role }) => {
  let data = JSON.stringify({
    username: username,
    email: email,
    password: password,
    role: role,
  });

  const response = await axios.post(`${api_url}/api/auth/register`, data, request_config);

  return response.data;
};

/**
 * login user
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} user data
 */
export const loginUser = async ({ email, password }) => {
  let data = JSON.stringify({
    email: email,
    password: password,
  });

  const response = await axios.post(`${api_url}/api/auth/login`, data, request_config);

  return response.data;
};

/**
 * check user login status and get uer data 
 * @returns user data
 */
export const checkLogin = async () => {
  const response = await axios.get(`${api_url}/api/auth/user`, request_config)

  return response.data
}

/**
 * fetch some statistic data to show an overview
 * @returns overview statistics data
 */
export const fetchDashboardOverviewData = async () => {
  const response = await axios.get(`${api_url}/api/client/statistics`, request_config);

  return response.data
}

/**
 * fetch statistic data for issues
 * @returns issue statistics data
 */
export const fetchIssuesStatus = async () => {
  const response = await axios.get(`${api_url}/api/client/issuesStatistics`, request_config);

  return response.data
}

/**
 * fetch statistic data for tasks
 * @returns tasks statistics data
 */
export const fetchTasksStatus = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksStatistics`, request_config);

  return response.data
}

/**
 * fetch list of issues
 * @returns list of issues
 */
export const fetchIssueList = async () => {
  const response = await axios.get(`${api_url}/api/client/issueList`, request_config);

  return response.data
}

/**
 * fetch top users of project based on finished tasks
 * @returns some information about top users
 */
export const fetchTopUsers = async () => {
  const response = await axios.get(`${api_url}/api/client/topUsers`, request_config);

  return response.data
}

/**
 * fetch tasks count of past 20 days
 * @returns array with tasks count of each date 
 */
export const fetchTasksCountByDate = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksCountByDate`, request_config)

  return response.data
}

/**
 * fetch overview for 4 weeks
 * @returns closed issue count for each week
 */
export const fetchClosedIssuesPerWeek = async () => {
  const response = await axios.get(`${api_url}/api/client/closedIssuesPerWeek`, request_config)

  return response.data
}

/**
 * Fetches users data from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of user data objects.
 *
 * @example
 * const usersData = await fetchUsersData();
 * console.log(usersData);
 * // Output: [  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },  ...]
 */
export const fetchUsersData = async () => {
  const response = await axios.get(`${api_url}/api/client/usersData `, request_config)

  return response.data
}

/**
 * Fetches the list of tasks from the API.
 *
 * @returns {Promise<Array<Task>>} A promise that resolves to an array of task objects.
 *
 * @example
 * const tasksList = await fetchTasksList()
 * console.log(tasksList) // Output: [{ id: 1, name: 'Task 1' }, { id: 2, name: 'Task 2' }]
 */
export const fetchTasksList = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksList`, request_config)

  return response.data
}