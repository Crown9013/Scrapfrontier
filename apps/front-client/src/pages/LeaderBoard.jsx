import React, { useEffect }  from "react";
import TournamentBack from "../@monorepo/shared/assets/img/tournament_back.jpg";
import ContentHeader from '../@monorepo/shared/assets/img/leader_content_header.svg';
import ContentFooter from '../@monorepo/shared/assets/img/leader_content_footer.svg';
import TabWidget from "../components/TabWidget/TabWidget";
import config from '../config/var.config.js'

const LeaderBoard = () => {
    useEffect(() => {
        document.title = config.title + ' | LeaderBoard'
    }, [])
    return(
        <div>
            <main className="content">
                <div className="main main2">
                    <div className="main_container">
                        <div className="main__content">
                            <h1 className="text-center text120">
                            leaderboard
                            </h1>
                        </div>
                    </div>
                    <div className="main__video">
                        <img src={TournamentBack} alt=""/>
                    </div>
                </div>
            </main>
            <div className="main_container">
                <div className="mt-24">
                    <img src={ContentHeader} alt="content header"/>
                    <div style = {{backgroundColor:"rgba(255,255,255,0.05)", backdropFilter:"blur(10px)"}}>
                        <TabWidget/>
                    </div>
                    <img src={ContentFooter} alt="content footer"/>
                </div>
            </div>
        </div>
    );
}

export default LeaderBoard;