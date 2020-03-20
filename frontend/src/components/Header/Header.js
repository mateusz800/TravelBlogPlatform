import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import UserMenu from "./UserMenu/UserMenu";

const Header = ({ is_authenticated, logout, profilePK }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  return (
    <header className={`${styles.header} shadow`}>
      <Link to="/">
        <h2>Nazwa</h2>
      </Link>
      <nav>
        <Link to="/stories">stories</Link>
        <span className={styles.userBtn}><i className="fa fa-user"></i></span>
        <UserMenu
          profilePK={profilePK}
          visible={userMenuVisible}
          isAuthenticated={is_authenticated}
        />
      </nav>
    </header>
  );
};

export default Header;
