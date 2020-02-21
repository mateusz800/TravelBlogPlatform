import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profileActions";
import ProfileDetails from "./ProfileDetails";

class ProfileDetailsContainer extends Component {
  componentDidMount() {
    const {pk} = this.props.match.params;
    if(pk){
      this.props.loadData(pk);
    }
    
  }
  render() {
    return <ProfileDetails profile={this.props.profile} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getProfile(pk))
  };
}

function mapStateToProps(state) {
  return {
    profile: state.profiles.profile
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileDetailsContainer);
