import { useState } from "react";
import axios from "axios";
import config from "../config/var.config";

// const isProduct = process.env.REACT_APP_ENV === 'product' ? true : false
// const serverURL = process.env.REACT_APP_SERVER_URL;

export function useTournamentAndEvents() {
  const [total, setTotal] = useState(0);

  const getAllTournamentAndEvents = async (limit) => {
    try {
      const res = await axios.get(
        `${config.serverURL}api/tournament_and_events?limit=${limit}`
      );
      if (res.status === 200) {
        setTotal(res.data.total);
        return res.data.data;
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  return { getAllTournamentAndEvents, total };
}
