import React, { Component } from "react";
import { connect } from "react-redux";
import ArticleList from "./ArticleList";
import FilterColumn from "../FilterColumn/FilterColumn";
import { getArticles, searchArticles } from "../../actions/articleActions";

class ArticleListContainer extends Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent:'center'}}>
        <ArticleList articles={this.props.articles} />
        <FilterColumn/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: () => dispatch(getArticles()),
    search: (keywords) => dispatch(searchArticles(keywords))

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
