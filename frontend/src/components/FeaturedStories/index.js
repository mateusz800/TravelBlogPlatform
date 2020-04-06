import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";
import StoryBanner from "../StoryBanner";

class FeaturedStories extends React.Component {
  timeout = 5000;

  constructor(props) {
    super(props);
    this.state = { activeItemIndex: 0, elements: <StoryBanner /> };
    this.changeSlide = this.changeSlide.bind(this);
    this.interval = setInterval(this.changeSlide, this.timeout);
  }

  componentDidUpdate(prevProps) {
    console.log("ok");
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
    this.setState({ activeItemIndex: newIndex});
  }

  render() {
    return (
      <ItemsCarousel
        requestToChangeActive={index =>
          this.setState({ activeItemIndex: index })
        }
        infiniteLoop={true}
        activeItemIndex={this.state.activeItemIndex}
        numberOfCards={1}
        gutter={0}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        chevronWidth={40}
      >
        {this.state.elements}
      </ItemsCarousel>
    );
  }
}

function mapStateToProps(state) {
  return {
    stories: state.stories.featuredStories
  };
}

export default connect(mapStateToProps)(FeaturedStories);
