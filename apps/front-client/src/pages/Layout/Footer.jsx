import React from "react";
import X from "@monorepo/shared/assets/img/x.svg";
import Discord from "@monorepo/shared/assets/img/discord.svg";
import Twitch from "@monorepo/shared/assets/img/Twitch.svg";
import Medium from "@monorepo/shared/assets/img/Medium.svg";
import Youtube from "@monorepo/shared/assets/img/Youtube.svg";
const Footer = () => {

    return (
        <footer className="footer">
            <div className="main_container">
                <div className="footer__inner">
                    <div className="socials">
                        <a href="/" className="socials__item">
                            <span className="socials__icon">
                                <img src={X} alt=""/>
                            </span>
                            <span className="socials__title text22">
                                X.com
                            </span>
                        </a>
                        <a href="javascript;" className="socials__item">
                            <span className="socials__icon">
                                <img src={Discord} alt=""/>
                            </span>
                            <span className="socials__title text22">
                                discord
                            </span>
                        </a>
                        <a href="javascript;" className="socials__item">
                            <span className="socials__icon">
                                <img src={Twitch} alt=""/>
                            </span>
                            <span className="socials__title text22">
                                Twitch
                            </span>
                        </a>
                        <a href="javascript;" className="socials__item">
                            <span className="socials__icon">
                                <img src={Youtube} alt=""/>
                            </span>
                            <span className="socials__title text22">
                                Youtube
                            </span>
                        </a>
                        <a href="javascript;" className="socials__item">
                            <span className="socials__icon">
                                <img src={Medium} alt=""/>
                            </span>
                            <span className="socials__title text22">
                                Medium
                            </span>
                        </a>
                    </div>


                    <nav className="footer-nav">
                        <a href="javascript;" className="footer-nav__link"><span>Media Kit</span></a>
                        <a href="javascript;" className="footer-nav__link"><span>Documentation</span></a>
                        <a href="javascript;" className="footer-nav__link"><span>Terms of Use</span></a>
                        <a href="javascript;" className="footer-nav__link"><span>Privacy Policy</span></a>
                        <a href="javascript;" className="footer-nav__link"><span>Cookie Policy</span></a>
                    </nav>

                    <div className="footer__c">
                        <div className="text16 text14-mob">
                            © 2024 Scrap Frontier Studios. All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer