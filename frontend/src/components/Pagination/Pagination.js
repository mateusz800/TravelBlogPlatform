import React from "react";
import PropTypes from "prop-types";
import ArrowButton from "./ArrowButton/ArrowButton";
import styles from "./styles.module.css";

const Pagination = ({ visible, actual, max }) => {
  const numbers = [...Array(visible).keys()].map(
    number => number + actual - Math.floor(visible / 2)
  );
  return (
    <div className={styles.container}>
      {actual > 1 && <ArrowButton direction="prev" />}
      {numbers.map(number => (number > 0 ? number : undefined))}
      {actual < max && <ArrowButton direction="next" />}
    </div>
  );
};

export default Pagination;
