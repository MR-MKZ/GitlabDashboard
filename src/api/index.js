import * as axios from "axios";

// User apis

const api_url = import.meta.env.VITE_API_URL;

/**
 * register user function
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {"admin" || "user"} role
 * @returns {Promise<object>} user data
 */
export const createUser = async ({ username, email, password, role }) => {
    let data = {
        username: username,
        email: email,
        password: password,
        role: role
    }

    const response = await axios.post(`${api_url}/api/auth/register`, data)

    return response.data
}

/**
 * login user function
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} user data
 */
export const loginUser = async ({ email, password }) => {
    let data = {
        email: email,
        password: password
    }

    const response = await axios.post(`${api_url}/api/auth/login`, data)

    return response.data
}