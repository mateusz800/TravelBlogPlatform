import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation} from 'react-i18next';
import FeaturedStories from "../FeaturedStories";
import StorySlider from "../StoryLists/StorySlider";
import {
  getFeaturedStories,
  getPopularStories
} from "../../actions/storyActions";
import i18next from "../../i18n"

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getFeaturedStories(3);
    props.getPopularStories(3);
  }

  render() {
    const {t} = this.props;
    return (
      <div>
        <FeaturedStories speed={5000} />
        {this.props.popularStories && (
          <Fragment>
              <h3 style={{ padding: "20px" }}>
                --- {i18next.t('trending')} ------------------------
              </h3>
            <StorySlider stories={this.props.popularStories} />
          </Fragment>
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFeaturedStories: count => dispatch(getFeaturedStories(count)),
    getPopularStories: count => dispatch(getPopularStories(count))
  };
}

function mapStateToProps(state) {
  return {
    popularStories: state.stories.popularStories
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Home));
