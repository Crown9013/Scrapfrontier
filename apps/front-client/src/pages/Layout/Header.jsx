import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { shortenWalletAddress } from "../../helper";

import logo from "@monorepo/shared/assets/img/logo.svg";
import close from "@monorepo/shared/assets/img/close.svg";
import burger from "@monorepo/shared/assets/img/burger.svg";
import steam from "@monorepo/shared/assets/img/steam_avatar.svg";
import userAvatar from "@monorepo/shared/assets/img/user_avatar.svg";
import metaMastSVG from '@monorepo/shared/assets/img/metamask.svg';
import X from "@monorepo/shared/assets/img/x.svg";
import Discord from "@monorepo/shared/assets/img/discord.svg";
import Twitch from "@monorepo/shared/assets/img/Twitch.svg";
import Medium from "@monorepo/shared/assets/img/Medium.svg";
import Youtube from "@monorepo/shared/assets/img/Youtube.svg";
import DropdownArrow from "@monorepo/shared/assets/img/dropdown_arrow.svg";
import DashBoard from "@monorepo/shared/assets/img/dashbord_icon.svg";
import LeaderBoard from "@monorepo/shared/assets/img/leaderbord_icon.svg";

// import axios from "axios";
// import userAvatar from "@monorepo/shared/assets/img/user_avatar.png";
import LogOut1 from "@monorepo/shared/assets/img/logout1.svg";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const Header = () => {
  const location = useLocation();

  const [isBuger, setIsBuger] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [, setUsername] = useState("");
  const [steamAvatar, setSteamAvatar] = useState("");
  const [steamApiFlag, setSteamApiFlag] = useState(false);
  // const [isLeaderBoard, setLeaderBoard] = useState(false);
  // const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = React.useState(false);

  const { address, isConnected } = useAccount();
  const navigate = useNavigate();

  useEffect(() => {
    const steam_id = localStorage.getItem("steam_id");
    const steam_username = localStorage.getItem("steam_username");
    const steam_avatar = localStorage.getItem("steam_avatar");
    if (steam_id) setLogin(true);
    setUsername(steam_username);
    setSteamAvatar(steam_avatar);
    // setIsAdmin(location.pathname.includes('/admin'))
  }, [location.pathname]);

  const bugerClick = () => {
    setIsBuger(!isBuger);
  };
  const handleLoginSteam = () => {
    setOpen(!open);
    // if (isLogin) {
    //     localStorage.removeItem('steam_id')
    //     localStorage.removeItem('steam_username')
    //     localStorage.removeItem('steam_avatar')
    //     setLogin(false)
    //     setSteamApiFlag(true);
    //     // navigate('/')
    //     return;
    // }
    if (!localStorage.getItem("steam_id") && !isLogin) {
      window.location.href = `${process.env.REACT_APP_SERVER_URL}auth/steam`;
    }
  };
  const onLogoutClick = () => {
    if (isLogin) {
      setOpen(!open);
      setLogin(!isLogin);
      setSteamApiFlag(false);
      localStorage.removeItem("steam_id");
      localStorage.removeItem("steam_username");
      localStorage.removeItem("steam_avatar");
      navigate("/", { replace: true });
    }
  };
  const handleDashboard = () => {
    setOpen(!open);
    navigate("user/dashboard", { replace: true });
  };
  const handleLeaderBoard = () => {
    setOpen(!open);
    navigate("user/leaderboard", { replace: true });
  };
  return (
    <header className={isBuger ? "header _open" : "header"}>
      {/* <header className="header"> */}
      <div className="main_container">
        <div className="header__inner">
          <a href="/" className="header__logo">
            <img src={logo} alt="" />
          </a>
          <div className="menu">
            <nav className="nav">
              <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="../howtostart">
                  <span>How to start</span>
                </Link>
              </div>
              {/* <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="../support">
                  <span>Support</span>
                </Link>
              </div> */}
              <div
                href="javascript;"
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="../rules">
                  <span>Rules</span>
                </Link>
              </div>
            </nav>
            <button
              className="menu__close"
              onClick={() => {
                setIsBuger(!isBuger);
              }}
            >
              <img src={close} alt="menu close" />
            </button>
            <div className="socials">
              <a href="javascript;" className="socials__item">
                <span className="socials__icon">
                  <img src={X} alt="" />
                </span>
                <span className="socials__title text22">X.com</span>
              </a>
              <a href="javascript;" className="socials__item">
                <span className="socials__icon">
                  <img src={Discord} alt="" />
                </span>
                <span className="socials__title text22">discord</span>
              </a>
              <a href="javascript;" className="socials__item">
                <span className="socials__icon">
                  <img src={Twitch} alt="" />
                </span>
                <span className="socials__title text22">Twitch</span>
              </a>
              <a href="javascript;" className="socials__item">
                <span className="socials__icon">
                  <img src={Youtube} alt="" />
                </span>
                <span className="socials__title text22">Youtube</span>
              </a>
              <a href="javascript;" className="socials__item">
                <span className="socials__icon">
                  <img src={Medium} alt="" />
                </span>
                <span className="socials__title text22">Medium</span>
              </a>
            </div>
          </div>
          {!isLogin && !steamApiFlag ? (
            <button
              className="header__btn m-btn m-btn-red"
              onClick={handleLoginSteam}
            >
              <img src={steam} alt="" />
              <span className="uppercase">login with steam</span>
            </button>
          ) : (
            <div className="dropdown lg:w-[190px] sm:w-[190px] ssm:w-[150px]">
              <button
                className="header__btn m-btn m-btn-red lg:w-[190px] sm:w-[190px] ssm:w-[150px]"
                onClick={handleLoginSteam}
              >
                <img
                  src={steamAvatar || userAvatar}
                  className="avatar_img"
                  alt="User Avatar"
                />
                <span>PROFILE</span>
                <img
                  src={DropdownArrow}
                  style={{ marginLeft: "10px", width: "20px" }}
                  alt="Dropdown Arrow"
                />
              </button>
              {open ? (
                <ul className="menuBtn">
                  {isConnected && (
                    <li className="menuBtn-item pl-5 p-2">
                      <button className="uppercase flex justify-left lg:gap-3 sm:gap-4 ssm:gap-2">
                        <img
                          src={metaMastSVG}
                          alt="steam"
                          style={{ width: "20px" }}
                        />
                        <span className="lg:text-xl sm:text-xl ssm:text-sm">
                          {shortenWalletAddress(address)}
                        </span>
                      </button>
                    </li>
                  )}
                  <li className="menuBtn-item pl-5 p-2">
                    <button
                      className="uppercase flex justify-left lg:gap-3 sm:gap-4 ssm:gap-2"
                      onClick={handleDashboard}
                    >
                      <img
                        src={DashBoard}
                        alt="steam"
                        style={{ width: "20px" }}
                      />
                      <span className="lg:text-xl sm:text-xl ssm:text-sm">
                        DASHBOARD
                      </span>
                    </button>
                  </li>
                  <li className="menuBtn-item pl-5 p-2">
                    <button
                      className="uppercase flex justify-left lg:gap-3 sm:gap-4 ssm:gap-2"
                      onClick={handleLeaderBoard}
                    >
                      <img
                        src={LeaderBoard}
                        alt="leaderboard"
                        style={{ width: "20px" }}
                      />
                      <span className="lg:text-xl sm:text-xl ssm:text-sm">
                        LEADERBOARD
                      </span>
                    </button>
                  </li>
                  <li className="menuBtn-item pl-5 p-2">
                    <button
                      className="uppercase flex justify-left lg:gap-3 sm:gap-4 ssm:gap-2"
                      onClick={onLogoutClick}
                    >
                      <img
                        src={LogOut1}
                        alt="logout"
                        style={{ width: "20px" }}
                      />
                      <span className="lg:text-xl sm:text-xl ssm:text-sm">
                        LOG OUT
                      </span>
                    </button>
                  </li>
                </ul>
              ) : null}
            </div>
            // <button className="header__btn m-btn m-btn-red" onClick={handleLoginSteam}>
            //     <img src={steamAvatar} className="avatar_img" />
            //     <span>{username}</span>
            //     <img src={LogOut1} style={{ marginLeft: "10px", width: "20px" }} />
            // </button>
          )}
          <button className="burger m-btn m-btn-red" onClick={bugerClick}>
            <img src={burger} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
