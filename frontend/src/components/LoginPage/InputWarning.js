import React from "react";

const InputWarning = ({ display, message }) => (
  <div styles="display:inline">{display && <span>{message}</span>}</div>
);

export default InputWarning;
