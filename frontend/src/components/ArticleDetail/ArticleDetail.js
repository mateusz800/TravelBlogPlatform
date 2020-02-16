import React from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import ArticleInfo from "../ArticleInfo/ArticleInfo";

const ArticleDetail = ({ article }) => (
  <div>
    <Image src={article.photo_source} height="60vh" />
    <ArticleInfo
      title={article.title}
      date={article.date}
      subtitle={article.subtitle}
      author={article.author}
    />
    <div>
        {article.body}
    </div>
  </div>
);

ArticleDetail.propTypes = {
  article: PropTypes.element
};

export default ArticleDetail;
