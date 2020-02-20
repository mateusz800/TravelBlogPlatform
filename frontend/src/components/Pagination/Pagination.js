import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ArrowButton from "./Buttons/ArrowButton";
import PageNumber from "./Buttons/PageNumber";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Pagination = ({ visible, actual, max, searchKeywords }) => {
  const numbers = [...Array(visible).keys()].map(number => {
    const actualNumber = number + actual - Math.floor(visible / 2);
    if (actualNumber <= max) {
      return actualNumber;
    }
    return;
  });
  
  return (
    <Fragment>
      <div className={styles.container}>
        {actual > 1 ? (
          <Link to={`/blog/page/${actual - 1}`}>
            <ArrowButton direction="prev" />
          </Link>
        ) : (
          <ArrowButton direction="prev" disabled={true} />
        )}
        {numbers.map(number => {
          const link = searchKeywords
            ? `/blog/search/${searchKeywords}/page/${number}`
            : `/blog/page/${number}`;
          return (
            <Link to={link} key={number}>
              {number > 0 ? (
                <PageNumber number={number} key={number} />
              ) : (
                <Fragment key={number} />
              )}
            </Link>
          );
        })}
        {actual < max ? (
          <Link to={`/blog/page/${actual + 1}`}>
            <ArrowButton direction="next" />
          </Link>
        ) : (
          <ArrowButton direction="next" disabled={true} />
        )}
      </div>
    </Fragment>
  );
};

Pagination.propTypes = {
  visible: PropTypes.number.isRequired,
  actual: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default Pagination;
