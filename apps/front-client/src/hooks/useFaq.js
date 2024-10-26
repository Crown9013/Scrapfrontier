import { useState, useCallback } from "react";
import axios from "axios";
import config from "../config/var.config";

export function useFaq() {
  const [total, setTotal] = useState(0);

  const getAllFaq = useCallback(async (limit) => {
    try {
      const res = await axios.get(
        `${config.serverURL}api/faq`
      );
      if (res.status === 200) {
        setTotal(res.data.total);
        return res.data.data;
      } else {
        setTotal(0);
        return [];
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }, []);

  return { getAllFaq, total };
}
