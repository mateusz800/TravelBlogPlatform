import React, { Fragment } from "react";
import {withTranslation} from "react-i18next"
import styles from "./styles.module.css";
import TruncuatedText from "../TruncuatedText/TruncuatedText";

const StoryBanner = ({ story, t }) => {
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
            <span className={styles.readMore}>{t("read more")}</span>
          </div>
        </Fragment>
      )}
      <div className={styles.gradient}></div>
    </div>
  );
};

export default withTranslation()(StoryBanner);
