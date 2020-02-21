import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StoryDetails from "./StoryDetail";
import { getStory } from "../../actions/storyActions";

class ArticleDetailContainer extends Component {
  componentDidMount() {
    this.props.loadData(this.props.match.params.pk);
  }
  render() {
    if (this.props.story) {
      return <StoryDetails story={this.props.story} />;
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
    story: state.stories.currentStory
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailContainer);
