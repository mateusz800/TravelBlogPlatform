import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Author from "../../Author/Author";
import styles from "./styles.module.css";

/*
Basic information such as: author, date, title, subtitle.

*/
const Info = ({ author, date, title, subtitle }) => (
  <Fragment>
    {(author || date) && (
      <div className={styles.details}>
        {author && <Author name={author.name} image={author.profile_photo.source || null} />}
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
  /* Author object containing parameters such as name, profile_photo (object with source param) */
  author: PropTypes.any,
  /* String with date */
  date: PropTypes.string,
  /* Title of the card content. It is larger than others labels. */
  title: PropTypes.string,
  /* Subtitle of the card content. It will display under the title. */
  subtitle: PropTypes.string
};

export default Info;
