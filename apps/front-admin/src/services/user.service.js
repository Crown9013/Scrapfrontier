import axios from "axios"
import { authHeader } from "../libs/auth.header"

const API_URL = process.env.REACT_APP_SERVER_URL

export const getUserBoard = () => {
  return axios.get(API_URL + 'user', {headers: authHeader()})
}