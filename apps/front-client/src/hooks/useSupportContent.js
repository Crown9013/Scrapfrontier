import { useState, useCallback } from "react";
import axios from "axios";
import config from '../config/var.config';

export function useSupportContent() {

    const [total, setTotal] = useState(0)

    const getAllSupportContent = useCallback(async () => {
        try {
          const res = await axios.get(`${config.serverURL}api/support`)
          console.log(res)
          if(res.status === 200) {
              setTotal(res.data.total);
              return res.data.data
          } else {
              setTotal(0)
              return []
          }
        } catch (e) {
          console.error(e)
          return []
        }
    }, [])

    return {getAllSupportContent, total}
}