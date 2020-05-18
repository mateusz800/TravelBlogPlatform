import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { requestPasswordReset, resetLoginStatusMessages } from "../../actions/profileActions";
import styles from "./styles.module.css";

class ResetPasswordForm extends Component {
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
    const { email } = this.state;
    this.props.resetPassword(email);
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h5 className={styles.warning}>{this.props.loginStatus || " "}</h5>
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            onChange={this.handleChange}
          />
          <input type="submit" value={t("Send me an email with reset link")} />
        </form>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: (email) => dispatch(requestPasswordReset(email)),
    clearMessages: () => dispatch(resetLoginStatusMessages()),
  };
}

export default connect(null, mapDispatchToProps)(withTranslation()(ResetPasswordForm));
