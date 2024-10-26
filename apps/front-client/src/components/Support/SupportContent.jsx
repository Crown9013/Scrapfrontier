import React, { useState, useCallback, useEffect } from "react";
import Spoiler from "../Faq/Spoiler";
import Close2 from "@monorepo/shared/assets/img/close2.svg";
import { useSupportContent } from "../../hooks/useSupportContent";

const SupportContent = () => {
  const { getAllSupportContent } = useSupportContent();

  const [supportContents, setSupportContents] = useState([]);

  const refresh = useCallback(async () => {
    setSupportContents(await getAllSupportContent());
  }, [getAllSupportContent]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="main_container">
      <div className="support__grid">
        <div className="support__col">
          <h2 className="text80">FAQ</h2>
          <div className="faq__items">
            {supportContents?.map((item, index) => (
              <Spoiler title={item.title} content={item.content} key={index} />
            ))}
          </div>
        </div>
        <div className="support__col">
          <form action="" className="req-form">
            <div className="text46">Submit a request</div>
            <div className="req-form__fields">
              <div className="fg _error">
                <label>Your email address</label>
                <input type="email" />
                <div className="fg__error-text">
                  <button type="button" className="fg__clear">
                    <img src={Close2} alt="" />
                  </button>
                  <span>Not correct</span>
                </div>
              </div>
              <div className="fg">
                <label>Subject</label>
                <input type="text" />
              </div>
              <div className="fg">
                <label>SteamID</label>
                <input type="text" />
              </div>
              <div className="fg">
                <label>Description</label>
                <textarea></textarea>
              </div>
              <div className="fg">
                <label>Attachments</label>
                <div className="file-input _full">
                  <div className="file-input__wrap">
                    <div
                      className="custom-file-container"
                      data-upload-id="file-input"
                    ></div>
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
};
export default SupportContent;
