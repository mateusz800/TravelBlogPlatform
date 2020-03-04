import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { logout } from "../../actions/profileActions";

const Header = ({ is_authenticated, logout, profilePK }) => (
  <header className={`${styles.header} shadow`}>
    <Link to="/stories">stories</Link>
    {!is_authenticated && (
      <Fragment>
        <Link to="/register">join</Link>
        <Link to="/login">login</Link>
      </Fragment>
    )}
    
    {is_authenticated && (
      <Fragment>
        <Link to={`/profile/${profilePK}`}>profile</Link>
        <button onClick={logout}>logout</button>

      </Fragment>
    )}
  </header>
);

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

function mapStateToProps(state) {
  return {
    is_authenticated: state.profiles.is_authenticated,
    profilePK: state.profiles.user_pk
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
