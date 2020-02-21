import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Author from "../Author/Author";
import styles from "./styles.module.css";

const ArticleDetail = ({ article }) => {
  const content = useRef(null);
  return (
    <div>
      {article.photo && (
        <Image src={article.photo.source} height="95vh" brightness={50} />
      )}
      <div className={styles.info}>
        <h1>{article.title}</h1>
        <h3>{article.subtitle}</h3>
        <div className={styles.authorDate}>
          {article.author && (
            <Link to={`/profile/${article.author.pk}`}>
              <Author name={article.author.name} color="white" size={30} />
            </Link>
          )}
          <span />
          <h5>{article.published_date}</h5>
        </div>
        <button
          className={styles.arrow}
          onClick={() => {
            content.current.scrollIntoView();
          }}
        >
          <i className={styles.arrowDown}></i>
        </button>
      </div>
      <article
        ref={content}
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </div>
  );
};


export default ArticleDetail;
