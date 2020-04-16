import React from "react";
import { connect } from "react-redux";
import FeaturedStories from "../FeaturedStories";
import { getFeaturedStories } from "../../actions/storyActions";

class Home extends React.Component {
  constructor(props) {
    super(props);
    props.getFeaturedStories(3);
  }
  render() {
    return (
      <div>
        <FeaturedStories speed={5000} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFeaturedStories: count => dispatch(getFeaturedStories(count))
  };
}

export default connect(null, mapDispatchToProps)(Home);
