import React, { useEffect } from "react";
import SupportImg from "../@monorepo/shared/assets/img/Support.jpg";
import SupportContent from "../components/Support/SupportContent";
import config from '../config/var.config.js'

const Support = () =>{
    useEffect(() => {
        document.title = config.title + ' | Support'
    }, [])
    return(
            <main className="content">
                <div className="main main2">
                    <div className="main_container">
                        <div className="main__content">
                            <h1 className="text120">
                                Support
                            </h1>
                        </div>
                    </div>
                    <div className="main__video">
                        <img src={SupportImg} alt=""/>
                    </div>
                </div>
                <div className="support">
                    <SupportContent/>
                </div>
            </main>
 
    );
}
export default Support