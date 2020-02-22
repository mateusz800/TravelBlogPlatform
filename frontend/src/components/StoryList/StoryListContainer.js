import React, { Component } from "react";
import { connect } from "react-redux";
import StoryList from "./StoryList";
import FilterColumn from "../FilterColumn/FilterColumn";
import Pagination from "../Pagination/Pagination";
import {
  changePage,
  searchStories,
  searchStoriesOnPage
} from "../../actions/storyActions";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

class ArticleListContainer extends Component {
  componentDidMount() {
    const { keywords, page } = this.props.match.params;
    if (keywords && page) {
      this.props.searchOnPage(keywords, page);
    } else if (keywords) {
      this.props.search(keywords);
    } else {
      this.props.loadPage(page || 1);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.match.params.page != prevProps.match.params.page) {
      this.props.loadPage(this.props.match.params.page);
    }
  }

  render() {
    const keywords = this.props.match.params.keywords;
    return (
      <div className={styles.listContainer}>
        <div className={styles.availableWidth}>
          <div>
            {keywords && (
              <p className={`text-center ${styles.results}`}>
                Results for search: {keywords}
                <Link to='/stories/page/1'><span>&times;</span></Link>
              </p>
            )}
            <StoryList stories={this.props.stories} />
          </div>
          <Pagination
            actual={parseInt(this.props.match.params.page) || 1}
            max={Math.ceil(this.props.storiesCount / 12)}
            visible={5}
            searchKeywords={keywords}
          />
        </div>
        <FilterColumn />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPage: page => dispatch(changePage(page)),
    search: keywords => dispatch(searchStories(keywords)),
    searchOnPage: (keywords, page) =>
      dispatch(searchStoriesOnPage(keywords, page))
  };
}

function mapStateToProps(state) {
  return {
    stories: state.stories.stories,
    storiesCount: state.stories.storiesCount
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListContainer);
