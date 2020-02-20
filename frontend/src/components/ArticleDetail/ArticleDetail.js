import React, { useRef } from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import styles from "./styles.module.css";

const ArticleDetail = ({ article }) => {
  const content = useRef(null);
  return (
    <div>
      {article.photo &&<Image src={article.photo.source} height="95vh" brightness={50} />}
      <div className={styles.info}>
        <h1>{article.title}</h1>
        <h3>{article.subtitle}</h3>
        <button className={styles.displayOnHover} onClick={()=>{content.current.scrollIntoView()}}>
          <span>&#8681;</span>
        </button>
      </div>
      <div
        ref={content}
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </div>
  );
};

ArticleDetail.propTypes = {
  article: PropTypes.element
};

export default ArticleDetail;
