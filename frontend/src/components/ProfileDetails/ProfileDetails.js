import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import Avatar from "../Avatar/Avatar";
import { connect } from "react-redux";
import StoryList from "../StoryList/StoryList";
import styles from "./styles.module.css";
import { render } from "react-dom";
import { uploadPhoto } from "../../actions/mediaActions";
import {
  setUploadedPhotoType,
  changeBackgroundPhoto
} from "../../actions/profileActions";
import { photoTypes } from "../../actions/types";

class ProfileDetails extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    if (name === "backgroundPhoto") {
      if (e.target.files.length > 0) {
        this.props.uploadPhoto(e.target.files[0], photoTypes.PROFILE_BACKGROUND_PHOTO);
        this.props.setPhotoType("backgroundPhoto");
        return;
      }
    } else if (name === "profilePhoto") {
      if (e.target.files.length > 0) {
        this.props.uploadPhoto(e.target.files[0], photoTypes.PROFILE_PHOTO);
        this.props.setPhotoType("profilePhoto");
        return;
      }
    }
    this.setState({ [name]: e.target.value });
    this.props.updateData(name, e.target.value);
  }
  render() {
    const { profile, stories, loggedUserProfile, page, children } = this.props;
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
            {loggedUserProfile && (
              <Link to={`/profile/${profile.pk}/settings`}>
                <h4>Settings</h4>
              </Link>
            )}
            <div className="options">
              {loggedUserProfile && (
                <Link to="/story/new">
                  <h4>add story +</h4>
                </Link>
              )}
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
            {children}
          </div>
        </div>
      );
    }

    return <Fragment />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uploadPhoto: (file, type) => dispatch(uploadPhoto(file, type)),
    setPhotoType: type => dispatch(setUploadedPhotoType(type))
  };
}

export default connect(null, mapDispatchToProps)(ProfileDetails);
