import React from "react";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

const MoreButton = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
      <div className={styles.menu}>{children}</div>
    </div>
  );
};

export default MoreButton;
