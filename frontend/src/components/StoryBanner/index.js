import React, { Fragment } from "react";
import styles from "./styles.module.css";
import TruncuatedText from "../TruncuatedText/TruncuatedText";

const StoryBanner = ({ story }) => {
  return (
    <div className={styles.container}>
      {story && (
        <Fragment>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${story.photo.source})` }}
          ></div>

          <div className={styles.content}>
            <h2>{story.title}</h2>
            <h4>{story.subtitle}</h4>
            <TruncuatedText text={story.body} lines={10}/>
            <span className={styles.readMore}>czytaj dalej</span>
          </div>
        </Fragment>
      )}
      <div className={styles.gradient}></div>
    </div>
  );
};

export default StoryBanner;
