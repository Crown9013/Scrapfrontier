
import axios from "axios";

const user = JSON.parse(localStorage.getItem('user'))

export const getByURL = async (url) =>{
    try {
        const res = await axios.get(url)
        if(res.status === 200) {
            return res.data
        } else {
            return null
        }
    } catch (e) {
        console.error(e)
        return null
    }
}

export const axiosInterface = async (method, uri, data, isFormData = false) => {
    try {
        return axios({
            method: method,
            url: `${process.env.REACT_APP_SERVER_URL}api/admin/${uri}`, 
            headers: { 
              "Content-Type": isFormData ? "multipart/form-data" : "application/json",
              'Authorization': 'Bearer ' + user.accessToken,
            }, 
            data: data
          })
    } catch (e) {
        console.error(e)
        return null
    }
}