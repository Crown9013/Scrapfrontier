import { useState, useCallback } from "react";
import axios from "axios";
import config from '../config/var.config';

export function useHowtostart() {

    const [total, setTotal] = useState(0)

    const getAllHowtostart = useCallback(async () => {
        try {
          const res = await axios.get(`${config.serverURL}api/howtostart`)
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

    return {getAllHowtostart, total}
}