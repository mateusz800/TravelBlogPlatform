import React from "react";
import PropType from "prop-types";

const PlayButton = ({ hidden }) => (
    
  <div>{hidden}{hidden ? <div /> : <button>></button>}</div>
);

PlayButton.defaultProps = {
  hidden: false
};

PlayButton.propTypes = {
  /**
   * It should be false when video is playing (otherwise true)
   */
  hidden: PropType.bool
};

export default PlayButton;
