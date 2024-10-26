import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "@monorepo/shared/assets/img/logo.svg";
import close from "@monorepo/shared/assets/img/close.svg";
import burger from "@monorepo/shared/assets/img/burger.svg";
import { logout } from "@monorepo/shared/assets/img/auth.services";

const Header = () => {
  const navigate = useNavigate()

  const [isBuger, setIsBuger] = useState(false);

  const handleLogout = React.useCallback(() => {
    setIsBuger(!isBuger)
    logout()
    navigate('/login')
  }, [isBuger, navigate])

  return (
    <header className={isBuger ? "header _open" : "header"}>
      <div className="main_container">
        <div className="header__inner">
          <a href="/" className="header__logo">
            <img src={logo} alt="" />
          </a>
          {window.localStorage.getItem('user') && <div className="menu">
            <nav className="nav">
              <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="/featured">
                  <span>Featured</span>
                </Link>
              </div>
              <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="/tournament_and_events">
                  <span>Tournament & Events</span>
                </Link>
              </div>
              <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="/howtostart">
                  <span>How to start</span>
                </Link>
              </div>
              {/* <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="/support">
                  <span>Support</span>
                </Link>
              </div> */}
              <div
                className="nav__link"
                onClick={() => {
                  setIsBuger(!isBuger);
                }}
              >
                <Link to="/rules">
                  <span>Rules</span>
                </Link>
              </div>
              {window.localStorage.getItem('user') && <div
                className="nav__link"
              >
                <button className="block bg-[#CC402A] ml-auto uppercase p-2 text-[18px]" onClick={handleLogout}>
                  Log Out
                </button>
              </div>}
            </nav>
            <button
              className="menu__close"
              onClick={() => {
                setIsBuger(!isBuger);
              }}
            >
              <img src={close} alt="" />
            </button>
          </div>}
          <button
            className="burger m-btn m-btn-red"
            onClick={() => {
              setIsBuger(!isBuger);
            }}
          >
            <img src={burger} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
