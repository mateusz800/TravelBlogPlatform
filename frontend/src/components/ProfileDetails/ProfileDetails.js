import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Image from "../Image/Image";

const ProfileDetails = ({ profile }) => {
  if (profile) {
    return (
      <div>
        <Image src={profile.photo.source} width={200} height={200} />
        <h3>{profile.name}</h3>
      </div>
    );
  }
  return <Fragment />;
};

export default ProfileDetails;
