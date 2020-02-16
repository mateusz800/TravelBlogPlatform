import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { searchArticles } from "../../actions/articleActions";

class FilterColumn extends React.Component {
  constructor() {
    super();
    this.state = { search: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const keywords = e.target.value;
    this.props.search(keywords);
  }
  render() {
    return (
      <div className={styles.container}>
        <input
          type="search"
          placeholder="search"
          onChange={this.handleInputChange}
        />
        <h5>New / Popular</h5>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    search: keywords => dispatch(searchArticles(keywords))
  };
}

export default connect(null, mapDispatchToProps)(FilterColumn);
