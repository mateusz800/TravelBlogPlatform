import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.css";
import { searchStories } from "../../actions/storyActions";

class FilterColumn extends React.Component {
  constructor() {
    super();
    this.state = { search: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }
  handleInputChange(e) {
    this.setState({ search: e.target.value });
  }
  handleSearchSubmit(e) {
    e.preventDefault();
    const keywords = this.state.search;
    this.props.search(keywords);
    this.props.history.push(`/stories/search/${keywords}/page/1`);
  }
  render() {
    return (
      <Fragment>
        <div className={styles.container}>
          <form onSubmit={this.handleSearchSubmit}>
            <input
              type="search"
              placeholder="search"
              onChange={this.handleInputChange}
            />
          </form>
        </div>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: keywords => dispatch(searchStories(keywords))
  };
}

export default connect(null, mapDispatchToProps)(withRouter(FilterColumn));
