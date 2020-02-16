import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import TruncuatedText from "../TruncuatedText/TruncuatedText";
import styles from "./styles.module.css";

const ArticleList = ({ articles }) => {
  if (articles.length == 0) {
    return <div className={styles.emptyList}>Nie znaleziono artykułów spełniających kryteria</div>;
  }
  return (
    <div className={styles.articleList}>
      {!Array.isArray(articles) ? (
        <Card title={articles.title}>
          <TruncuatedText lines={3} text={articles.content} />
        </Card>
      ) : (
        articles.map(article => (
          <Card
            key={article.pk}
            title={article.title}
            subtitle={article.subtitle}
            image={article.photo_source}
            date={article.published_date}
            author={article.author}
          >
            <TruncuatedText lines={3} text={article.body} />
          </Card>
        ))
      )}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

export default ArticleList;
