import React from "react";
import { Link } from "react-router-dom";
import Bg from "@monorepo/shared/assets/img/bg.svg";
import Bg2 from "@monorepo/shared/assets/img/bg2.svg";
import Play from "@monorepo/shared/assets/img/let-play.svg";
const LetPlay = () => {
    return(
        
        <div className="let-play">
            <img className="let-play__bg _view1" src={Bg} alt=""/>
            <img className="let-play__bg _view2" src={Bg2} alt=""/>
            <div className="let-play__wrap">
                <div className="main_container">
                    <div className="let-play__inner">
                        <div className="let-play__img">
                            <img src={Play} alt=""/>
                        </div>
                        <div className="let-play__content">
                            <div className="let-play__top">
                                <div className="h2">
                                    Play Rust and
                                    Earn SCRP
                                </div>
                            </div>
                            <div className="let-play__desc">
                                <div className="text20 text18-tablet">Play Rust on Scrapfrontier.com, where gameplay rewards you with SCRP. Use your earnings to enhance your pass, unlocking even greater SCRP gains. Dive into a cycle of play, earn, and upgrade for maximum rewards.</div>
                            </div>
                            <div className="let-play__desc">
                                <div className="text20 text18-tablet">Find out how to get started in <Link to='/howtostart'>How to start</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LetPlay