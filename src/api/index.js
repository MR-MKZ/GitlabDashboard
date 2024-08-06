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
 * register user function
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {"admin" || "user"} role
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
 * login user function
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

export const checkLogin = async () => {
  const response = await axios.get(`${api_url}/api/auth/user`, request_config)

  return response.data
}

export const fetchDashboardOverviewData = async () => {
  const response = await axios.get(`${api_url}/api/client/statistics`, request_config);

  return response.data
}

export const fetchIssuesStatus = async () => {
  const response = await axios.get(`${api_url}/api/client/issuesStatistics`, request_config);

  return response.data
}

export const fetchTasksStatus = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksStatistics`, request_config);

  return response.data
}

export const fetchIssueList = async () => {
  const response = await axios.get(`${api_url}/api/client/issueList`, request_config);

  return response.data
}

export const fetchTopUsers = async () => {
  const response = await axios.get(`${api_url}/api/client/topUsers`, request_config);

  return response.data
}

export const fetchTasksCountByDate = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksCountByDate`, request_config)

  return response.data
}

export const fetchClosedIssuesPerWeek = async () => {
  const response = await axios.get(`${api_url}/api/client/closedIssuesPerWeek`, request_config)

  return response.data
}

export const fetchUsersData = async () => {
  const response = await axios.get(`${api_url}/api/client/usersData `, request_config)

  return response.data
}

export const fetchTasksList = async () => {
  const response = await axios.get(`${api_url}/api/client/tasksList`, request_config)

  return response.data
}