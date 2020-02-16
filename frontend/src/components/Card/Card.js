import React, { useState } from "react";
import PropTypes from "prop-types";
import Author from "../Author/Author";
import Image from "../Image/Image";
import Video from "../VideoOnHover/Video";
import PlayButton from "../VideoOnHover/PlayButton/PlayButton";
import ArticleInfo from "../ArticleInfo/ArticleInfo";
import styles from "./styles.module.css";

const Card = ({ image, title, subtitle, author, date, video, children }) => {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      {video && (
        <Video src={video} image={image} muted={true} play={hover} height={200}>
          <PlayButton />
        </Video>
      )}
      {!video && image && <Image src={image} height={200} />}
      <ArticleInfo
        author={author}
        date={date}
        title={title}
        subtitle={subtitle}
      />
      <div className={styles.p}>{children}</div>
    </div>
  );
};

Card.propTypes = {
  /**
   * Title of the card.
   */
  title: PropTypes.string,
  /**
   * Subtitle of the content that card presents.
   */
  subtitle: PropTypes.string,
  /**
   * Author of the article
   */
  author: PropTypes.object,
  /**
   * A string representation of the date when that article was published.
   */
  date: PropTypes.string,
  /**
   * Url with image.
   * when video property is set the given image will be a poster of the video.
   */
  image: PropTypes.string,
  /**
   * Content of the card.
   * Everything that is under title (subtitle).
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
};

export default Card;
