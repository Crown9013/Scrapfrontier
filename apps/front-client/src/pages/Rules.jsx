import React, { useEffect } from "react";
import RulesImg from "../@monorepo/shared/assets/img/rules.jpg";
import config from '../config/var.config.js'
import RulesContent from "../components/Rules/RulesContent";
const Rules = () =>{
    useEffect(() => {
        document.title = config.title + ' | Rules'
    }, [])
    return(
            <main className="content">
                <div className="main main2">
                    <div className="main_container">
                        <div className="main__content">
                            <h1 className="text120">
                                Rules
                            </h1>
                        </div>
                    </div>
                    <div className="main__video">
                        <img src={RulesImg} alt=""/>
                    </div>
                </div>    
                <div className="rules">
                    <RulesContent/>
                </div>    
            </main>
        
    );
}
export default Rules