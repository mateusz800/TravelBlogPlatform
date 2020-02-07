import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

const Video = ({ src, width, height, play, muted, loop, image, children }) => {
  const [isPlaying, setIsPlaying] = useState(play || false);
  const videoElem = useRef(null);

  // Play or pause the video depending on the play property
  if (!play && videoElem.current) {
    videoElem.current.load();
  } else if (play && videoElem.current) {
    videoElem.current.play();
  }

  useEffect(() => {
    // Update the isPlaying state when the props will change
    setIsPlaying(play);
  });

  function handlePlay() {
    videoElem.current.play();
    setIsPlaying(true);
  }
  function handlePause() {
    videoElem.current.pause();
    setIsPlaying(false);
  }

  return (
    <div className={styles.container}>
      <video
        width={width}
        height={height}
        poster={image}
        autoPlay={play}
        muted={muted}
        loop={loop}
        preload='false'
        className={styles.video}
        ref={videoElem}
        onClick={isPlaying ? handlePause : undefined}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={styles.controls}>
        {React.cloneElement(children, {
          play: handlePlay,
          hidden: isPlaying ? true : false
        })}
      </div>
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  play: PropTypes.bool,
  muted: PropTypes.bool,
  loop: PropTypes.bool,
  image: PropTypes.string,
  /**
   * Controls. Only one element can be given.
   */
  children: PropTypes.element
};

Video.defaultProps = {
  width: "100%",
  height: 'auto'
};

export default Video;
