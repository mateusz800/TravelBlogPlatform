import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { login, resetLoginStatusMessages } from "../../actions/profileActions";
import styles from "./styles.module.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    props.clearMessages();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate() {
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
    const { t } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h5 className={styles.warning}>{this.props.loginStatus || " "}</h5>
          <input
            type="text"
            name="email"
            placeholder={t("email")}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder={t("password")}
            onChange={this.handleChange}
          />
          <div className={styles.agreements}>
            <a
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer"
              }}
            >
              {t("Forget password")}
            </a>
          </div>
          <input type="submit" value={t("login")} />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LoginForm));
