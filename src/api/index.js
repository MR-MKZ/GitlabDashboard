import axios from "axios";
import Cookies from "js-cookie";

// User apis

const api_url = import.meta.env.VITE_API_URL;

let token = Cookies.get("token")

const request_config = {
  credentials: 'include',
  headers: {
    "Content-Type": "application/json",
    "token": token
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