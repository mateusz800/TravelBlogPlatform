import React from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import TruncuatedText from "../TruncuatedText/TruncuatedText";

const ArticleList = ({ articles }) => {
  if (!articles) {
    return <div />;
  }
  return (
    <div>
      {!Array.isArray(articles) ? (
        <Card title={articles.title}>
          <TruncuatedText lines={3} text={articles.content} />
        </Card>
      ) : (
        articles.map(article => (
          <Card
            key={article.pk}
            title={article.title}
            image={article.featured_photo}
            date={article.date}
            author={article.author}
          >
            <TruncuatedText lines={3} text={article.content} />
          </Card>
        ))
      )}
    </div>
  );
};

ArticleList.propTypes = {
    articles: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array
    ])
}





export default ArticleList;
