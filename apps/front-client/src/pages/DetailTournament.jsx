import React, {useEffect, useState} from "react";

import TournamentBack from "../@monorepo/shared/assets/img/tournament_back.jpg";
import SettingIcon from "../@monorepo/shared/assets/img/setting_icon.svg";
import { useLocation } from "react-router-dom";

const DetailTournament = () => {
    const location = useLocation();

    const [item, setItem] = useState(null)

    useEffect(()=>{
        window.scrollTo(0, 0);
        if (location.state?.item) setItem(location.state.item)
    }, [location])

    return(
        <div>
            <main className="content">
                <div className="main main2">
                <div className="main_container">
                    <div className="main__content">
                            <h1 className="text120">
                               {item?.name}
                            </h1>
                        </div>
                    </div>
                    <div className="main__video">
                        <img src={TournamentBack} alt="tournament"></img>
                    </div>
                </div>
            </main>
            <div className="main_container"> 
                <div className="grid grid-rows-4 lg:mt-24 sm:mt-24 ssm:mt-12">
                    <div className="row-span-2">
                        <div className="grid lg:grid-cols-4 ">
                            <div className="lg:col-span-2">
                                <img
                                    className="w-[270px] min-w-[175px]" 
                                    src={item?.image ? `${process.env.REACT_APP_SERVER_URL}images/${item?.image}` : `${process.env.REACT_APP_SERVER_URL}images/default`} 
                                    alt="tournament"/>
                                <span className="absolute lg:text-xl sm:text-xl ssm:text-sm  text-center -mt-12 lg:px-4 sm:px-4 ssm:px-2 w-[160px]" style={{backgroundColor:"#CC402A"}}>TOURNAMENT</span>
                            </div>
                            <div className="lg:col-span-2 lg:mt-2 sm:mt-12 ssm:mt-2">
                                <div className="grid grid-rows-7 lg:gap-2 sm:gap-2 ssm:gap-1">
                                    <div className="row-span-1 lg:mt-0 sm:mt-0 ssm:mt-4">
                                        <div className="grid grid-cols-4">
                                            <div className="col-span-4">
                                                <img src={SettingIcon} alt="price" className="lg:w-[50px] sm:w-[30px] ssm:w-[30px] float-left"/>
                                                <span className="float-left ml-2 lg:text-4xl sm:text-2xl ssm:text-xl">35</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-span-1">
                                        <div className="grid grid-cols-8 text-lg h-[50px] gap-4">
                                            <div className="lg:col-span-3 sm:col-span-3 ssm:col-span-5 text-xl text-center h-[50px] p-2" style = {{backgroundColor:"rgba(255,255,255,0.05)"}}>{item?.date} at {item?.time}</div>
                                            <div className="lg:col-span-1 sm:col-span-1 ssm:col-span-2 text-xl text-center h-[50px] p-2" style = {{backgroundColor:"rgba(255,255,255,0.05)"}}>{item?.participants ? item?.participants : 0} / {item?.capacity}</div>
                                        </div>
                                    </div>
                                    <div className="row-span-1">
                                        <button className="w-[30%] text-2xl p-4" style={{backgroundColor: "#CC402A"}}>JOIN</button>
                                    </div>
                                    <div className="row-span-4">
                                        <div className="text-2xl">
                                            <span className="float-left text-left" style={{whiteSpace: 'pre-wrap'}}>
                                                {item?.description}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="row-span-2 lg:mt-0 sm:-mt-12 ssm:-mt-18">
                        <div className="text-2xl">
                            <span className="float-left text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            <br/>
                            <br/>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                            <br/>
                            <br/>
                            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                            </span>
                        </div>
                    </div> */}
                    
                </div>
            </div>
        </div>
    );
}
export default DetailTournament;