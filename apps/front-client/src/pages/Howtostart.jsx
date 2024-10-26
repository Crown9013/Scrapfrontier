import React, { useEffect } from "react";
import Howstart from '../@monorepo/shared/assets/img/how-start.jpg';
import Faq from '../components/Faq/Faq.jsx';
import config from '../config/var.config.js'

const Howtostart = () =>{
    useEffect(() => {
        document.title = config.title + ' | How to start'
    }, [])
    return(
        <div>
            <main className="content">  
                <div className="main main2">
                    <div className="main_container">
                        <div className="main__content">
                            <h1 className="text120">
                                How to start
                            </h1>
                        </div>
                    </div>
                    <div className="main__video">
                        <img src={Howstart} alt=""/>
                    </div>
                </div>
            </main>
            <Faq/>
        </div>
    );
}
export default Howtostart