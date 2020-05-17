import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { logout } from "../../../actions/profileActions";
import styles from "../styles.module.css";

const UserMenu = ({ logout, profilePK, isAuthenticated, t }) => {
  if (profilePK || !isAuthenticated) {
    return (
      <div className={styles.menu}>
        <div>
          {isAuthenticated === false && (
            <Fragment>
              <Link to="/register">{t("join")}</Link>
              <Link to="/login">{t("login")}</Link>
            </Fragment>
          )}
          {isAuthenticated && (
            <Fragment>
              <Link to={`/profile/${profilePK}`}>{t("profile")}</Link>
              <span onClick={logout}>{t("logout")}</span>
            </Fragment>
          )}
        </div>
      </div>
    );
  }
  return <Fragment />;
};

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.profiles.is_authenticated,
    profilePK: state.profiles.user_pk,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(UserMenu));
