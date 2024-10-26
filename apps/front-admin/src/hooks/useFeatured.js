import { useState } from "react";
import axios from "axios";

const serverURL = process.env.REACT_APP_SERVER_URL;

export function useFeatured() {

    const [total, setTotal] = useState(0)

    const getAllFeatures = async (limit) => {
        try {
            const res = await axios.get(`${serverURL}api/admin/feature?limit=${limit}`)
            if(res && res.status === 200) {
                setTotal(res.data.total);
                return res.data.data
            } else {
                return []
            }
        } catch (e) {
            console.error(e)
            return []
        }
    }

    return {getAllFeatures, total}
}