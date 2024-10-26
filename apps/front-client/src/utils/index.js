
import axios from "axios";

export const getByURL = async (url) =>{
    const res = await axios.get(url)
    if(res.status === 200) {
        return res.data
    } else {
        return null
    }
}