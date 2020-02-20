import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import TruncuatedText from "../TruncuatedText/TruncuatedText";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const ArticleList = ({ articles }) => {
  if (articles.length == 0) {
    return (
      <div className={styles.emptyList}>
        No items find matching the criteria
      </div>
    );
  }
  return (
    <div className={styles.articleList}>
      {!Array.isArray(articles) ? (
        <Link to={`/article/${articles.pk}`}>
          <Card title={articles.title} height="375px">
            <TruncuatedText lines={3} text={articles.content} />
          </Card>
        </Link>
      ) : (
        articles.map(article => (
          <Link to={`/article/${article.pk}`} key={article.pk}>
            <Card
              key={article.pk}
              title={article.title}
              subtitle={article.subtitle}
              image={article.photo_source}
              date={article.published_date}
              author={article.author}
              height='375px'
            >
              <TruncuatedText lines={3} text={article.body} />
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

export default ArticleList;
