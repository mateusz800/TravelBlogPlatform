import React, { useState } from "react";
import { Link } from "react-router-dom";
import { browserHistory } from 'react-router';
import { withRouter } from 'react-router'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./styles.module.css";
import UserMenu from "./UserMenu/UserMenu";

const Header = ({ is_authenticated, logout, profilePK, history }) => {
  const [mobileMenu, setMobileMenu] = useState(false);
  history.listen((location, action) => {
    setMobileMenu(false);
  });
  return (
    <header className={`${styles.header} shadow`}>
      <Link to="/">
        <h2>Nazwa</h2>
      </Link>
      <div className={styles.mobileMenuBtn}>
        <FontAwesomeIcon icon={faBars}  onClick={()=>setMobileMenu(!mobileMenu)}/>
      </div>
      <nav className={mobileMenu? styles.show:styles.mobileHide}>
        <Link to="/stories">stories</Link>
        <span className={styles.userBtn}><i className="fa fa-user"></i></span>
        <UserMenu
          profilePK={profilePK}
          isAuthenticated={is_authenticated}
        />
      </nav>
 
    </header>
  );
};

export default withRouter(Header);
