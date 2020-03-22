import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import TruncuatedText from "../TruncuatedText/TruncuatedText";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const StoryList = ({ stories, currentUser }) => {
  if (!stories) {
    return <Fragment />;
  } else if (stories.length == 0) {
    return (
      <div className={styles.emptyList}>
        No items find matching the criteria
      </div>
    );
  }
  return (
    <div className={styles.articleList}>
      {!Array.isArray(stories) ? (
        <Link to={`/story/${stories.pk}`}>
          <Card title={stories.title} height="375px">
            <TruncuatedText lines={3} text={stories.content} />
          </Card>
        </Link>
      ) : (
        stories.map(story => (
          <Link to={`/story/${story.pk}`} key={story.pk}>
            <Card
              key={story.pk}
              title={story.title}
              subtitle={story.subtitle}
              image={story.photo.source}
              date={story.published_date}
              author={story.author}
              height="375px"
              owner={story.author.pk == currentUser ? true : false}
              pk={story.pk}
            >
              <TruncuatedText lines={3} text={story.body} />
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

StoryList.propTypes = {
  stories: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
};

export default StoryList;
