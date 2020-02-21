import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Header = () => (
  <header className={`${styles.header} shadow`}>
    <ul>
      <li>
        <Link to="/stories">stories</Link>
      </li>
    </ul>
  </header>
);

export default Header;
