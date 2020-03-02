import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StoryDetails from "./StoryDetail";
import { getStory } from "../../actions/storyActions";
import { Redirect } from "react-router";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { authorized: true };
  }
  componentDidMount() {
    this.props.loadData(this.props.match.params.pk);
  }

  componentDidUpdate(){
    if (
      this.props.story.status &&
      this.props.story.status != "published" &&
      this.props.profilePK != this.props.story.author.pk
    ) {

      this.setState({ authorized: false });
    }
  }
  render() {
    if (!this.state.authorized) {
      return <Redirect to="/404" />;
    }
    if (this.props.story && this.props.story.author) {
      return (
        <StoryDetails
          story={this.props.story}
          owner={
            this.props.profilePK === this.props.story.author.pk ? true : false
          }
        />
      );
    } else {
      return <Fragment />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getStory(pk))
  };
}

function mapStateToProps(state) {
  return {
    story: state.stories.currentStory,
    profilePK: state.profiles.user_pk
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailContainer);
