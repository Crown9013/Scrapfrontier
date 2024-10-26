import React from "react";
import StatIcon from "@monorepo/shared/assets/img/stat-icon.svg";
import StatIcon2 from "@monorepo/shared/assets/img/stat-icon2.svg";
import { usePlayer } from "../../hooks/usePlayer";
const Stat = () => {
    const {allPlayer} = usePlayer()
    
    return(
        <div className="stat">
            <div className="main_container">
                <div className="stat__items">
                    <div className="stat-item">
                        <img src={StatIcon} alt="" className="stat-item__icon"/>
                        <div className="stat-item__title">
                            active <br/>
                            servers
                        </div>
                        <div className="stat-item__num">
                            8
                        </div>
                    </div>
                    <div className="stat-item">
                        <img src={StatIcon2} alt="" className="stat-item__icon"/>
                        <div className="stat-item__title">
                            registered <br/>
                            players
                        </div>
                        <div className="stat-item__num">
                            {allPlayer?.totals ? allPlayer.totals : 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Stat 