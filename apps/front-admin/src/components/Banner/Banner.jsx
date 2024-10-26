import React, {useState} from "react";
import { Link } from "react-router-dom";
// import './Banner.css';
import Video from '@monorepo/shared/assets/video/video.mp4';
const Banner = () => {
    // const [BigTitle, setBigTitle] = useState(props.BigTitle);
    // const [title, setTitle] = useState(props.title);
    // const [content, setContent] = useState(props.content);
    // const [button, setButton] = useState(props.button);

    // useEffect(() => {   
    //     setBigTitle(props.BigTitle);
    //   }, [props.BigTitle]);

    //   useEffect(() => {
    //     setTitle(props.title);
    //   }, [props.title]);
    //   useEffect(() => {
    //     setContent(props.content);
    //   }, [props.content]);
    //   useEffect(() => {
    //     setButton(props.button);
    //   }, [props.button]);
    return(
        <div className="main">
            <div className="main_container">
                <div className="main__content">
                    <h1 className="h1">
                        Same Game,
                        New Thrills
                    </h1>
                    <div className="main__desc">
                        <div className="text20 text16-tablet">
                            Transforming the familiar game world. Now, every action in your favorite game not only brings joy but also adds new impressions and significance.
                        </div>
                    </div>
                    <div className="main__nav">
                        <div className="m-btn m-btn-red"><Link to = "../howtostart">
                            <span>How to start</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main__video">
                <video autoPlay muted playsInline loop id="video" src={Video}></video>
            </div>
        </div>
    );
}
export default Banner