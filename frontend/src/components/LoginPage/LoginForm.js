import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { login, resetLoginStatusMessages } from "../../actions/profileActions";
import styles from "./styles.module.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    props.clearMessages();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(){
    this.props.clearMessages();
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  }

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h5 className={styles.warning}>{this.props.loginStatus || " "}</h5>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.handleChange}
          />
          <input type="submit" value="login" />
        </form>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
    clearMessages: () => dispatch(resetLoginStatusMessages())
  };
}

function mapStateToProps(state) {
  return {
    loginStatus: state.profiles.loginStatus
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
