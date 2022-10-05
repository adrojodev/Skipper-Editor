import React from "react";
import "../styles/buttons.css";

const EditInteractionsButton = () => {
  function openEditOptions(e) {
    let allEditedElements = document.getElementsByClassName(
      "addInteractionContainer"
    );
    let allEditButtons = document.getElementsByClassName("editButton");

    Array.from(allEditedElements).forEach((element) => {
      element.style.display = "none";
    });

    Array.from(allEditButtons).forEach((button) => {
      button.style.display = "flex";
    });

    e.target.parentNode.parentNode.parentNode.getElementsByTagName(
      "div"
    )[1].style.display = "flex";
    e.target.style.display = "none";
  }
  return (
    <button
      className="iconButton iconFilledButton material-icons editButton"
      onClick={openEditOptions}
    >
      edit
    </button>
  );
};

export default EditInteractionsButton;
