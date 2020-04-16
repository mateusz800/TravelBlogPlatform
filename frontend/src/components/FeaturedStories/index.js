import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";
import StoryBanner from "../StoryBanner";
import FadeInSlider from "../FadeInSlider";

class FeaturedStories extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItemIndex: 0, elements: <StoryBanner /> };
    this.changeSlide = this.changeSlide.bind(this);
    this.interval = setInterval(this.changeSlide, props.speed);
  }

  componentDidUpdate(prevProps) {
    if (this.props.stories && this.props.stories != prevProps.stories) {
      const elements = this.props.stories.map(story => (
        <Link to={`/story/${story.pk}`} key={story.pk}>
          <StoryBanner story={story} />
        </Link>
      ));
      this.setState({ elements: elements });
    }
  }

  changeSlide() {
    const newIndex =
      this.state.activeItemIndex + 1 < this.props.stories.length
        ? this.state.activeItemIndex + 1
        : 0;
    this.setState({ activeItemIndex: newIndex });
  }

  render() {
    return (
        <FadeInSlider speed={this.props.speed}>
          {this.state.elements}
        </FadeInSlider>
    );
  }
}

function mapStateToProps(state) {
  return {
    stories: state.stories.featuredStories
  };
}

export default connect(mapStateToProps)(FeaturedStories);
