import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import Image from "../Image/Image";
import Avatar from "../Avatar/Avatar";
import MoreOptions from "../MoreOptions";
import StoryList from "../StoryLists/StoryList";
import styles from "./styles.module.css";
import { render } from "react-dom";
import { uploadPhoto } from "../../actions/mediaActions";
import {
  setUploadedPhotoType,
  changeBackgroundPhoto,
} from "../../actions/profileActions";
import { photoTypes } from "../../actions/types";

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { optionsMenu: false };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    if (name === "backgroundPhoto") {
      if (e.target.files.length > 0) {
        this.props.uploadPhoto(
          e.target.files[0],
          photoTypes.PROFILE_BACKGROUND_PHOTO,
          this.props.userPK
        );
        this.props.setPhotoType("backgroundPhoto");
        return;
      }
    } else if (name === "profilePhoto") {
      if (e.target.files.length > 0) {
        this.props.uploadPhoto(
          e.target.files[0],
          photoTypes.PROFILE_PHOTO,
          this.props.userPK
        );
        this.props.setPhotoType("profilePhoto");
        return;
      }
    }
    this.setState({ [name]: e.target.value });
    this.props.updateData(name, e.target.value);
  }
  render() {
    const {
      profile,
      stories,
      loggedUserProfile,
      page,
      draftStories,
      children,
      t,
    } = this.props;
    if (profile) {
      return (
        <div>
          <Image height="40vh" src={profile.background_photo.source} />
          {loggedUserProfile && page == "settings" && (
            <div className={styles.bgPhotoInput}>
              <input
                type="file"
                name="backgroundPhoto"
                onChange={this.handleChange}
              />
            </div>
          )}
          <div className={`${styles.menu} shadow`}>
            <div className={styles.avatar}>
              <Avatar image={profile.profile_photo.source} size={100} />
            </div>
            <Link to={`/profile/${profile.pk}`}>
              <h3>{profile.name}</h3>
            </Link>
            <div
              className={styles.moreOptionsBtn}
              onClick={() =>
                this.setState({ optionsMenu: !this.state.optionsMenu })
              }
            >
              <MoreOptions />
            </div>
            <div
              className={
                this.state.optionsMenu ? styles.navShow : styles.navHide
              }
            >
              {loggedUserProfile && (
                <Link to={`/profile/${profile.pk}/settings`}>
                  <h4>{t("Settings")}</h4>
                </Link>
              )}
              <div className="options">
                {loggedUserProfile && (
                  <Link to="/story/new">
                    <h4>{t("add story")} +</h4>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className={styles.container}>
            {loggedUserProfile && page == "settings" && (
              <input
                type="file"
                name="profilePhoto"
                onChange={this.handleChange}
              />
            )}
            <div>{children}</div>
          </div>
        </div>
      );
    }

    return <Fragment />;
  }
}
function mapStateToProps(state) {
  return {
    userPK: state.profiles.user_pk,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadPhoto: (file, type, userPK) =>
      dispatch(uploadPhoto(file, type, userPK)),
    setPhotoType: (type) => dispatch(setUploadedPhotoType(type)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ProfileDetails));
