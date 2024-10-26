import React, { useState, useCallback, useEffect } from "react";
import { useRules } from "../../hooks/useRules";

const RuleContentComponent = ({ title, content, index }) => {
  return (
    <div>
      <h3>
        {index}. {title}
      </h3>
      <p style={{whiteSpace: 'pre-wrap'}}>{content}</p>
      <hr />
    </div>
  );
};

const RulesContent = () => {
  const { getAllRules } = useRules();

  const [rules, setRules] = useState([]);

  const refresh = useCallback(async () => {
    setRules(await getAllRules());
  }, [getAllRules]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="main_container">
      <div className="text">
        {rules?.map((item, index) => (
          <RuleContentComponent
            title={item.title}
            content={item.content}
            index={(index = 1)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
export default RulesContent;
