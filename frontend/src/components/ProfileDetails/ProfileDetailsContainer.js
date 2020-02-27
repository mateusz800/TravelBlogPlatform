import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile, changeBackgroundPhoto, changeProfilePhoto } from "../../actions/profileActions";
import ProfileDetails from "./ProfileDetails";
import StoryList from "../StoryList/StoryList";
import { getUserStories } from "../../actions/storyActions";
import SettingsForm from "./SettingsForm";

class ProfileDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedUserProfile: false };
  }
  componentDidMount() {
    const { pk } = this.props.match.params;
    if (pk) {
      if (this.props.userPK == pk) {
        this.setState({ loggedUserProfile: true });
      }
      this.props.loadProfileData(pk);
      this.props.loadStoriesData(pk);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.page === "settings" && prevProps.newPhoto != this.props.newPhoto){
      const {profileUpdatedPhoto} = this.props;
      console.log(profileUpdatedPhoto);
      if(profileUpdatedPhoto ===  "backgroundPhoto"){
  
        this.props.changeBackgroundPhoto(this.props.userPK, this.props.newPhoto.pk)
      }
      else if(profileUpdatedPhoto === "profilePhoto"){
        this.props.changeProfilePhoto(this.props.userPK, this.props.newPhoto.pk)
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
        {page === "main" &&
          userStories &&
          this.state.loggedUserProfile &&
          userStories.drafts.length > 0 && (
            <Fragment>
              Drafts
              <StoryList stories={userStories.drafts} />
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
    changeBackgroundPhoto: (userPK, photoPK) => dispatch(changeBackgroundPhoto(userPK, photoPK)),
    changeProfilePhoto: (userPK, photoPK) => dispatch(changeProfilePhoto(userPK, photoPK))
  };
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile,
    userStories: state.stories.userStories,
    userPK: state.profiles.user_pk,
    newPhoto: state.media.new_photo,
    profileUpdatedPhoto: state.profiles.updatedPhotoType
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailsContainer);
