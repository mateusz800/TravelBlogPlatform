import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Author from "../Author/Author";
import styles from "./styles.module.css";

const StoryDetails = ({ story }) => {
  const content = useRef(null);
  return (
    <div>
      {story.photo && (
        <Image src={story.photo.source} height="95vh" brightness={50} />
      )}
      <div className={styles.info}>
        <h1>{story.title}</h1>
        <h3>{story.subtitle}</h3>
        <div className={styles.authorDate}>
          {story.author && (
            <Link to={`/profile/${story.author.pk}`}>
              <Author name={story.author.name} color="white" size={30} />
            </Link>
          )}
          <span />
          <h5>{story.published_date}</h5>
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
        dangerouslySetInnerHTML={{ __html: story.body }}
      />
    </div>
  );
};


export default StoryDetails;
