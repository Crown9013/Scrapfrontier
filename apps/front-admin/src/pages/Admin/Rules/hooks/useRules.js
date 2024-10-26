import { useState, useCallback } from "react";
import { axiosInterface } from "../../../../utils";

export function useRules() {

    const [total, setTotal] = useState(0)

    const getAllRules = useCallback(async (limit) => {
        try {
          const res = await axiosInterface('get', `rules?limit=${limit}`, {})
          if(res && res.status === 200) {
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

    return {getAllRules, total}
}