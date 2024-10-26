import React, { useCallback, useEffect, useState } from "react";
import Spoiler from "./Spoiler";
import { useHowtostart } from "../../hooks/useHowtostart";

const Faq = () => {

    const { getAllHowtostart } = useHowtostart();
    const [faqs, setFaqs] = useState([])

    const refresh = useCallback(async () => {
        setFaqs(await getAllHowtostart());
    }, [getAllHowtostart])

    useEffect(() => {
        refresh()
    }, [refresh])

    return (

        <div className="faq">
            <div className="main_container">
                <div className="faq__items">
                    {faqs && faqs.map((item, index) => (
                        <Spoiler title={item.title} content={item.content} key={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Faq