import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProfile,
  changeBackgroundPhoto,
  changeProfilePhoto
} from "../../actions/profileActions";
import ProfileDetails from "./ProfileDetails";
import {
  getUserStories,
  getUserDraftStories
} from "../../actions/storyActions";
import SettingsForm from "./SettingsForm";
import { photoTypes } from "../../actions/types";
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
      this.props.loadPublishedStoriesData(pk);
      this.props.loadDraftStoriesData(pk);
    }
  }

  componentDidUpdate(prevProps) {
    const { pk } = this.props.match.params;
    if (pk != null && pk != this.state.pk) {
      this.setState({ pk: pk });
      this.props.loadProfileData(pk);
      this.props.loadPublishedStoriesData(pk);
      this.props.loadDraftStoriesData(pk);
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
    const { profile, userStories, userDraftStories, page, userPK } = this.props;
    return (
      <ProfileDetails
        profile={profile}
        stories={userStories}
        loggedUserProfile={this.state.loggedUserProfile}
        page={page}
      >
        {page === "settings" && <SettingsForm />}
        {page === "main"  && (
          <Fragment>
            {this.state.loggedUserProfile && userDraftStories && userDraftStories.length > 0 && (
              <div>
                <h3>Drafts:</h3>
                <StorySlider stories={userDraftStories} />
              </div>
            )}
            {userStories && userStories.length > 0 && (
              <div>
                {(userPK && userPK == userStories[0].author.pk) ? <h3>Published:</h3>: <h3>Stories:</h3>}
                <StorySlider stories={userStories} />
              </div>
            )}
          </Fragment>
        )}
      </ProfileDetails>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadProfileData: pk => dispatch(getProfile(pk)),
    loadPublishedStoriesData: pk => dispatch(getUserStories(pk)),
    loadDraftStoriesData: pk => dispatch(getUserDraftStories(pk)),
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
    userDraftStories: state.stories.userDrafts,
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
