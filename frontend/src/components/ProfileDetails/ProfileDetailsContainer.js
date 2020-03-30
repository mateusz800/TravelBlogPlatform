import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ItemsCarousel from "react-items-carousel";
import {
  getProfile,
  changeBackgroundPhoto,
  changeProfilePhoto
} from "../../actions/profileActions";
import ProfileDetails from "./ProfileDetails";
import StoryList from "../StoryLists/StoryList";
import { getUserStories } from "../../actions/storyActions";
import SettingsForm from "./SettingsForm";
import { photoTypes } from "../../actions/types";
import Card from "../Card/Card";
import TruncuatedText from "../TruncuatedText/TruncuatedText";
import StorySlider from "../StoryLists/StorySlider";

class ProfileDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedUserProfile: false, pk: null };
  }
  componentDidMount() {
    const { pk } = this.props.match.params;
    if (pk) {
      if (this.props.userPK == pk) {
        this.setState({ loggedUserProfile: true, pk: pk });
      }
      this.props.loadProfileData(pk);
      this.props.loadStoriesData(pk);
    }
  }

  componentDidUpdate(prevProps) {
    const { pk } = this.props.match.params;
    if (pk != null && pk != this.state.pk) {
      this.setState({ pk: pk });
      this.props.loadProfileData(pk);
      this.props.loadStoriesData(pk);
    }
    if (
      this.props.page === "settings" &&
      (prevProps.newProfilePhoto != this.props.newProfilePhoto ||
        prevProps.newBackgroundPhoto != this.props.newBackgroundPhoto)
    ) {
      const { profileUpdatedPhoto } = this.props;
      if (profileUpdatedPhoto === "backgroundPhoto") {
        this.props.changeBackgroundPhoto(
          this.props.userPK,
          this.props.newBackgroundPhoto.pk
        );
      } else if (profileUpdatedPhoto === "profilePhoto") {
        this.props.changeProfilePhoto(
          this.props.userPK,
          this.props.newProfilePhoto.pk
        );
      }
    }
  }

  render() {
    const { profile, userStories, page } = this.props;
    return (
      <ProfileDetails
        profile={profile}
        stories={userStories}
        loggedUserProfile={this.state.loggedUserProfile}
        page={page}
      >
        {page === "settings" && <SettingsForm />}
        {page === "main" && userStories && this.state.loggedUserProfile && (
          <Fragment>
            {userStories.drafts.length > 0 && (
              <div>
                Drafts:
                <StorySlider stories={userStories.drafts} />
              </div>
            )}
            {/*to fo published */}
          </Fragment>
        )}
      </ProfileDetails>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadProfileData: pk => dispatch(getProfile(pk)),
    loadStoriesData: pk => dispatch(getUserStories(pk)),
    changeBackgroundPhoto: (userPK, photoPK) =>
      dispatch(changeBackgroundPhoto(userPK, photoPK)),
    changeProfilePhoto: (userPK, photoPK) =>
      dispatch(changeProfilePhoto(userPK, photoPK))
  };
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
    userStories: state.stories.userStories,
    userPK: state.profiles.user_pk,
    newProfilePhoto: state.media[`new_${photoTypes.PROFILE_PHOTO}_photo`],
    newBackgroundPhoto:
      state.media[`new_${photoTypes.PROFILE_BACKGROUND_PHOTO}_photo`],
    profileUpdatedPhoto: state.profiles.updatedPhotoType
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailsContainer);
