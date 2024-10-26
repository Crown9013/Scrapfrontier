import axios from "axios"

const API_URL = process.env.REACT_APP_SERVER_URL

export const login = async (email, password) => {
  return axios.post(API_URL + 'api/admin/login', {email, password})
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const register = async (username, email, password) => {
  return await axios.post(API_URL + 'api/admin/register', {username, email, password})
}

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}