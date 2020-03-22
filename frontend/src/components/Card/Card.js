import React, { useState } from "react";
import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import Author from "../Author/Author";
import Image from "../Image/Image";
import Video from "../VideoOnHover/Video";
import PlayButton from "../VideoOnHover/PlayButton/PlayButton";
import Info from "./Info/Info";
import styles from "./styles.module.css";

const Card = ({
  image,
  title,
  subtitle,
  author,
  date,
  video,
  height,
  owner,
  pk,
  children
}) => {
  const [hover, setHover] = useState(false);

  function handleHover() {
    setHover(!hover);
  }

  return (
    <div
      className={styles.card}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      style={height ? { height: height } : {}}
    >
      {video && (
        <Video src={video} image={image} muted={true} play={hover} height={200}>
          <PlayButton />
        </Video>
      )}
      {!video && image && (
        <Image src={image} height={200} effect="zoom-on-hover" />
      )}
      <Info author={author} date={date} title={title} subtitle={subtitle} />
      <div className={styles.p}>{children}</div>
      {owner && (
        <div className={styles.options}>
          <Link to={`/story/${pk}/edit`}><i class="fa fa-edit"></i></Link>
          <i className="fa fa-trash"></i>
        </div>
      )}
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
   * Author of the story
   */
  author: PropTypes.object,
  /**
   * A string representation of the date when that story was published.
   */
  date: PropTypes.string,
  /**
   * Url with image.
   * when video property is set the given image will be a poster of the video.
   */
  image: PropTypes.string,
  /**
   * Is the current user owner of the content that the card shows
   */
  owner: PropTypes.bool,
  /**
   * Content of the card.
   * Everything that is under title (subtitle).
   */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
};

export default Card;
