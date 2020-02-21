import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";
import Avatar from '../Avatar/Avatar'

const ProfileDetails = ({ profile }) => {
  if (profile) {
    return (
      <div>
        <Avatar image={profile.photo.source} size={150}/>
        <h3>{profile.name}</h3>
      </div>
    );
  }
  return <Fragment />;
};

export default ProfileDetails;
