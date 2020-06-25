import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Author from "../Author/Author";
import styles from "./styles.module.css";
import MoreButton from "../MoreOptions";


const StoryDetails = ({ story, owner, removeFunc }) => {
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
            <Link to={`/profile/${story.author[0].pk}`}>
              <Author name={story.author[0].name} color="white" size={30} />
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
        <div className={styles.options}>
          {owner && (
            <MoreButton>
              <Link to={`/story/${story.pk}/edit`}>
                <button>edit</button>
              </Link>
              <button onClick={()=>removeFunc(story.pk)}>remove</button>
            </MoreButton>
          )}
        </div>
      </div>
      <article
        ref={content}
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: story.body }}
      />
    </div>
  );
};

StoryDetails.prototype = {
  /* Story object */
  story: PropTypes.object,
  /* Is current user author of the story */
  owner: PropTypes.bool
};

export default StoryDetails;
