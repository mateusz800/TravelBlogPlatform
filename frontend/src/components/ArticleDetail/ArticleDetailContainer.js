import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ArticleDetail from "./ArticleDetail";
import { getArticle } from "../../actions/articleActions";

class ArticleDetailContainer extends Component {
  componentDidMount() {
    this.props.loadData(this.props.match.params.pk);
  }
  render() {
    if (this.props.article) {
      return <ArticleDetail article={this.props.article} />;
    } else {
      return <Fragment />;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getArticle(pk))
  };
}

function mapStateToProps(state) {
  return {
    article: state.articles.currentArticle
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDetailContainer);
