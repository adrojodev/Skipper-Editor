import React from "react";
import { useState } from "react";
import InputFieldAndButtonContainer from "./InputFieldAndButtonContainer";
import "../styles/buttons.css";

const AddButton = ({ innerText, iconUsed }) => {
  const [components, setComponents] = useState([]);

  function addComponent(e) {
    if (e.target.innerText == "add\nAdd command") {
      setComponents([...components, "Command"]);
    } else {
      setComponents([...components, "Response"]);
    }
  }

  return (
    <div className="inputContainer">
      {components.map((item, i) => (
        <div className="innerIputFieldContainer">
          <InputFieldAndButtonContainer
            typeOfInput={item}
            isVisible="yes"
          ></InputFieldAndButtonContainer>
        </div>
      ))}
      <button className="text-button" onClick={addComponent}>
        <span className="material-icons">{iconUsed}</span>
        {innerText}
      </button>
    </div>
  );
};

export default AddButton;
