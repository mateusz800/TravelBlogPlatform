import React from "react";
import PropTypes from "prop-types";

const ArrowButton = ({ direction, disabled }) => {
  return (
    <button disabled={disabled}>
      {direction === "prev" && <span>&#x21e6;</span>}
      {direction === "next" && <span>&#8680;</span>}
    </button>
  );
};

export default ArrowButton;
