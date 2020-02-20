import React from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import styles from "./styles.module.css";

const ArticleDetail = ({ article }) => (
  <div>
    <Image src={article.photo_source} height="95vh" brightness={50} />
    <div className={styles.info}>
      <h1>{article.title}</h1>
      <h3>{article.subtitle}</h3>
      <a href="#content" className={styles.displayOnHover}>
        <span>&#8681;</span>
      </a>
    </div>
    <div
      id="content"
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: article.body }}
    />
  </div>
);

ArticleDetail.propTypes = {
  article: PropTypes.element
};

export default ArticleDetail;
