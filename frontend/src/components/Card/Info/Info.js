import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Author from "../../Author/Author";
import styles from "./styles.module.css";

const Info = ({ author, date, title, subtitle }) => (
  <Fragment>
    {(author || date) && (
      <div className={styles.details}>
        {author && <Author name={author.name} image={author.photo.source || null} />}
        {date && <h5 className={styles.date}>{date}</h5>}
      </div>
    )}
    <div className={styles.p}>
      {title && <h1 className={styles.title}>{title}</h1>}
      <h3 className={styles.subtitle}>{subtitle}</h3>
    </div>
  </Fragment>
);

Info.propTypes = {
  author: PropTypes.any,
  date: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default Info;
