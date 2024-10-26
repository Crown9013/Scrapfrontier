import React, { useCallback, useEffect, useState } from "react";
import { formatEther } from "viem";

import { useNFT } from "../../hooks/useNFT";
import { usePlayer } from "../../hooks/usePlayer";
import { useBalance } from "../../hooks/useBalance";

import {NumberFormatLimitedThreeSignificantDigits} from '../../helper'

import GeneralAvatar from "@monorepo/shared/assets/img/gamer_avatar.svg";
import CountryFlag from "@monorepo/shared/assets/img/country_flag.svg";

const tabs = [1, 2, 3, 4];

const TableRowComponent = (props) => {
  const { player, index, tier } = props;

  return (
    <tr className="grid grid-cols-12 bg-[rgba(255,255,255,0.02)] p-4 mt-4">
      <td className="col-span-2 flex lg:justify-start md:justify-start sm:justify-center lg:py-3 md:py-4 sm:py-5">
        <span
          className="rounded-full lg:h-10 md:h-8 sm: h-5 lg:w-10 md:w-8 sm:w-5 flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        >
          {index + 1}
        </span>
      </td>
      <td className="col-span-4 flex lg:justify-start md:justify-start sm:justify-center">
        <div className="flex lg:flex-row md:flex-row sm:flex-col lg:float-left md:float-left sm:text-center ">
          <img
            src={player.steam_avatar || GeneralAvatar}
            alt="steam avatar"
            className=" lg:pl-0 md:pl-0 sm:pl-0 lg:h-16 md:h-16 sm:h-8"
          />
          <span className=" uppercase lg:text-2xl md:text-xl sm:text-sm lg:ml-2 md:ml-3 sm:ml-0 mt-3">
            {player.steam_name || "Player"}
          </span>
        </div>
      </td>
      <td className="col-span-4 flex lg:justify-start md:justify-start sm:justify-center">
        <div className="flex lg:flex-row md:flex-row sm:flex-col lg:float-left md:float-left sm:text-center" style={{display:'flex', alignItems: 'center'}}>
          <img
            src={CountryFlag}
            alt="steam avatar"
            className="m-auto lg:pl-0 md:pl-0 sm:pl-0 lg:h-12 md:h-12 sm:h-8"
          />
          <span className="uppercase pl-2 lg:text-2xl md:text-xl sm:text-sm">
            scrapfrontier {tier}
          </span>
        </div>
      </td>
      <td className="col-span-2 lg:py-3 md:py-4 sm:py-5">
        <span className="lg:float-left md:float-left sm:float-right lg:text-2xl md:text-xl sm:text-sm items-center justify-center">
          {NumberFormatLimitedThreeSignificantDigits(player.points)}
        </span>
      </td>
    </tr>
  );
};

const TabWidget = () => {
  const { allPlayer } = usePlayer();
  const { currencyToken } = useNFT();
  const { getTokenBalance } = useBalance();

  const [playerList, setPlayerList] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleTabClick = useCallback((tab) => {
    setActiveTab(tab);
  }, [setActiveTab]);

  useEffect(() => {
    if (allPlayer?.data?.length > 0) {
      setLoading(true);
      let players = allPlayer.data.filter(
        (player) => player.nft_tier === activeTab
      );
      Promise.all(
        players.map(async (player) => {
          player.points = formatEther(
            await getTokenBalance(currencyToken, player.wallet_address)
          );
          return player;
        })
      ).then((players) => {
        setPlayerList(
          players.sort((a, b) => Number(b.points) - Number(a.points))
        );
      }).finally(() => setLoading(false));
    } else {
      // setPlayerList([]);
    }
  }, [allPlayer, activeTab, getTokenBalance, currencyToken]);

  return (
    <div>
      <div className="tab__header">
        <div className="grid grid-cols-12 lg:p-10 md:p-5 sm:p-2 lg:gap-5 md:gap-2">
          {tabs.map((tab, index) => (
            <div
              className="col-span-3 text-2xl text-center p-2"
              style={
                activeTab === tab
                  ? {
                      color: "#CC402A",
                      borderBottom: "2px solid #CC402A",
                      cursor: "pointer",
                    }
                  : {
                      color: "#ffff",
                      borderBottom: "2px solid rgba(255,255,255,0.05)",
                      cursor: "pointer",
                    }
              }
              onClick={() => handleTabClick(tab)}
              key={index}
            >
              <span className="uppercase">Tier{tab}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="tab__content lg:p-10 md:p-5 sm:p-2 lg:-mt-12 md:mt-2 sm:mt-2">
        <table className="w-[100%]">
          <thead
            className="w-[100%]"
            style={{ border: "2px solid rgba(255,255,255,0.05)" }}
          >
            <tr className="grid grid-cols-12 lg:px-5 md:px-5 sm:px-2 py-2">
              <th
                className="col-span-2 uppercase text-sm lg:text-left md:text-left sm:text-center"
                style={{ color: "#858584" }}
              >
                No
              </th>
              <th
                className="col-span-4 uppercase text-sm lg:text-left md:text-left sm:text-center"
                style={{ color: "#858584" }}
              >
                player name
              </th>
              <th
                className="col-span-4 uppercase text-sm lg:text-left md:text-left sm:text-center"
                style={{ color: "#858584" }}
              >
                server
              </th>
              <th
                className="col-span-2 uppercase text-sm lg:text-left md:text-left sm:text-center"
                style={{ color: "#858584" }}
              >
                points
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td height={50} align="center" valign="center" colSpan={4}>
                  Loading data...
                </td>
              </tr>
            ) : playerList.length === 0 ? (
              <tr>
                <td height={50} align="center" valign="center" colSpan={4}>
                  No Data to display
                </td>
              </tr>
            ) : (
              playerList.map((player, index) => (
                <TableRowComponent index={index} player={player} key={index} tier={activeTab}/>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabWidget;
