import React from "react";
import "../styles/buttons.css";

const DeleteFieldButton = ({ isVisible }) => {
  let isVisibleOrNot;

  function deleteThisItem(e) {
    e.target.parentNode.parentNode.remove();
  }

  if (isVisible == "yes") {
    isVisibleOrNot = "flex";
  } else {
    isVisibleOrNot = "none";
  }

  return (
    <button
      className="iconSimpleButton"
      style={{ display: isVisibleOrNot }}
      onClick={deleteThisItem}
    >
      <span className="material-icons small-button-icon">close</span>
    </button>
  );
};

export default DeleteFieldButton;
