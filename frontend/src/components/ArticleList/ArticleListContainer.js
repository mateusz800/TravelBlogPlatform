import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleList from "./ArticleList";
import FilterColumn from "../FilterColumn/FilterColumn";
import Pagination from "../Pagination/Pagination";
import { changePage, searchArticles } from "../../actions/articleActions";
import styles from "./styles.module.css";

class ArticleListContainer extends Component {
  componentDidMount() {
    const { keywords, page } = this.props.match.params;
    if (keywords) {
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
    const keywords = this.props.match.params.keywords
    return (
      <div className={styles.listContainer}>
        <div className={styles.availableWidth}>
          <div>
            {keywords && <p className={`text-center ${styles.results}` }>Results for search: {keywords}</p>}
            <ArticleList articles={this.props.articles} />
          </div>
          <Pagination
            actual={parseInt(this.props.match.params.page) || 1}
            max={Math.ceil(this.props.articlesCount / 4)}
            visible={5}
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
    search: keywords => dispatch(searchArticles(keywords))
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles.articles,
    articlesCount: state.articles.articlesCount
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListContainer);
