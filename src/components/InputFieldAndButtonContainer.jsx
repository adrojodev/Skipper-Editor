import React from "react";
import AddImageButton from "./AddImageButton";
import DeleteFieldButton from "./DeleteFieldButton";

const InputFieldAndButtonContainer = ({ typeOfInput, isVisible }) => {
  let isVisibleOrNot;
  let deleteVisibility;

  if (isVisible == "yes") {
    deleteVisibility = "flex";
  } else {
    deleteVisibility = "none";
  }

  function deleteEmptyClass(e) {
    e.target.classList.remove("emptyInput");
  }

  if (typeOfInput == "Command") {
    return (
      <div className="inputFieldContainer">
        <input
          type="text"
          className={typeOfInput.toLowerCase() + "Input inputComponent"}
          placeholder={typeOfInput}
          onChange={deleteEmptyClass}
        />
        <DeleteFieldButton isVisible={isVisible}></DeleteFieldButton>
      </div>
    );
  } else if (typeOfInput == "Response") {
    return (
      <div className="inputFieldContainer">
        <div className="textareaWrap">
          <textarea
            type="text"
            className={typeOfInput.toLowerCase() + "Input inputComponent"}
            placeholder={typeOfInput}
            onChange={deleteEmptyClass}
          />
        </div>

        <AddImageButton visible={isVisibleOrNot}></AddImageButton>
        <DeleteFieldButton isVisible={isVisible}></DeleteFieldButton>
      </div>
    );
  }
};

export default InputFieldAndButtonContainer;
