import React from "react";
import PropTypes from "prop-types";

const ArrowButton = ({ direction }) => (
  <div>
    {direction === "prev" && "<"}
    {direction === "next" && ">"}
  </div>
);

export default ArrowButton;
