import React from "react";
import Spoiler from "../Faq/Spoiler";
import Close2 from "@monorepo/shared/assets/img/close2.svg";

const SupportContent = () => {
    return(
            <div className="main_container">
                <div className="support__grid">
                    <div className="support__col">
                        <h2 className="text80">
                            FAQ
                        </h2>
                        <div className="faq__items">
                            <Spoiler
                            title={"Can I make money from my video/stream?"}
                            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                            />
                            <Spoiler
                            title={"What is the staging branch?"}
                            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                            />
                            <Spoiler
                            title={"I’m crashing! Performance is poor!"}
                            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                            />
                            <Spoiler
                            title={"The server I was playing on is down!"}
                            content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."}
                            />

                        </div>
                    </div>
                    <div className="support__col">
                        <form action="" className="req-form">
                            <div className="text46">
                                Submit a request
                            </div>
                            <div className="req-form__fields">
                                <div className="fg _error">
                                    <label>
                                        Your email address
                                    </label>
                                    <input type="email"/>
                                    <div className="fg__error-text">
                                        <button type="button" className="fg__clear">
                                            <img src={Close2} alt=""/>
                                        </button>
                                        <span>Not correct</span>
                                    </div>
                                </div>
                                <div className="fg">
                                    <label>
                                        Subject
                                    </label>
                                    <input type="text"/>
                                </div>
                                <div className="fg">
                                    <label>
                                        SteamID
                                    </label>
                                    <input type="text"/>
                                </div>
                                <div className="fg">
                                    <label>
                                        Description
                                    </label>
                                    <textarea></textarea>
                                </div>
                                <div className="fg">
                                    <label>
                                        Attachments
                                    </label>
                                    <div className="file-input _full">
                                        <div className="file-input__wrap">
                                            <div className="custom-file-container" data-upload-id="file-input"></div>
                                            <div className="file-input__inner">
                                                <div className="text22 font2">
                                                    Add file or drop files here
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="req-form__btn m-btn m-btn-black">
                                    <span>submit</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}
export default SupportContent