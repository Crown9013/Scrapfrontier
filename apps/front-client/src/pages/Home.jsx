import React, { useEffect } from "react";
import Banner from "../components/Banner/Banner.jsx";
import Stat from "../components/Stat/Stat.jsx";
import LetPlay from "../components/LetPlay/LetPlay.jsx";
import config from '../config/var.config.js'

const Home = () => {
    useEffect(() => {
        document.title = config.title + ' | Home'
    }, [])
    return (
        <div>
            <main className="content">
                <Banner/>  
                <Stat/> 
                <LetPlay/>
            </main>
            
        </div>
    );
} 
export default Home