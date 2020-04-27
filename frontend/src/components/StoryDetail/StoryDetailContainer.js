import React, { Component, Fragment } from "react";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import {withTranslation} from "react-i18next"
import { connect } from "react-redux";
import StoryDetails from "./StoryDetail";
import {
  getStory,
  removeStory,
  getSimilarStories
} from "../../actions/storyActions";
import StorySlider from "../StoryLists/StorySlider";
import styles from "./styles.module.css";

class ArticleDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { authorized: true, storyPK: null, locationKey: null };
    this.scrollAndChange = this.scrollAndChange.bind(this);
  }
  componentDidMount() {
    this.setState({ storyPK: this.props.match.params.pk });
    this.props.loadData(this.props.match.params.pk);
    this.props.loadSimilar(this.props.match.params.pk);
  }

  componentDidUpdate() {
    if (
      this.props.story &&
      this.props.story.status &&
      this.props.story.status != "published" &&
      this.props.profilePK != this.props.story.author.pk
    ) {
      this.setState({ authorized: false });
    }
    /* check if the storyPK don't changed. If so  update the state and rerender component */
    if (this.state.storyPK != this.props.match.params.pk) {
      window.scrollTo(0, 0);
      setTimeout(this.scrollAndChange, 750);
    } else {
      /* Update data when author changed a content */
      if (this.state.locationKey != this.props.location.key) {
        this.props.loadData(this.props.match.params.pk);
        this.setState({ locationKey: this.props.location.key });
      }
    }
  }
  /* Scroll up and change story */
  scrollAndChange() {
    this.props.loadSimilar(this.props.match.params.pk);
    this.setState({ storyPK: this.props.match.params.pk });
    this.props.loadData(this.props.match.params.pk);
  }
  render() {
    if (!this.state.authorized) {
      return <Redirect to="/404" />;
    }
    if (this.props.story && this.props.story.author && this.props.remove) {
      const {t} = this.props;
      return (
        <Fragment>
          <StoryDetails
            story={this.props.story}
            owner={
              this.props.profilePK === this.props.story.author.pk ? true : false
            }
            removeFunc={this.props.remove}
          />
          {this.props.similarStories && this.props.similarStories.length>0 && (
            <div className={styles.similarStories}>
              <h2>{t("Similar stories")}</h2>
              <StorySlider stories={this.props.similarStories} />
            </div>
          )}
        </Fragment>
      );
    } else {
      return <Fragment />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getStory(pk)),
    remove: pk => dispatch(removeStory(pk)),
    loadSimilar: pk => dispatch(getSimilarStories(pk))
  };
}

function mapStateToProps(state) {
  return {
    story: state.stories.currentStory,
    profilePK: state.profiles.user_pk,
    similarStories: state.stories.similarStories
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(ArticleDetailContainer));
