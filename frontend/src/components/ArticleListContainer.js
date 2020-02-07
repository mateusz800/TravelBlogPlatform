import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleList from "./ArticleList/ArticleList";
import { getArticles } from "../actions/articleActions";

class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return <ArticleList articles={this.props.articles} />;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => dispatch(getArticles())
  };
}

function mapStateToProps(state) {
  return {
    articles: state.articles.articles
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleListContainer);
