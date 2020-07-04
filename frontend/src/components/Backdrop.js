import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop = (props) => {
  const content = <div id="backdrop_div" onClick={props.onClick}></div>;
  return ReactDOM.createPortal(content, document.querySelector("body"));
};

export default Backdrop;
