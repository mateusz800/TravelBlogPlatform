import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { createNewPassword, resetLoginStatusMessages } from "../../actions/profileActions";
import styles from "./styles.module.css";

class NewPasswordForm extends Component {
  constructor(props) {
    super(props);
    props.clearMessages();
    console.log(props);
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
    const { password1, password2 } = this.state;
    if(password1 == password2 && this.props.userPK){
      this.props.createNewPassword(this.props.userPK, password1);
    }
    
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h5 className={styles.warning}>{this.props.loginStatus || " "}</h5>
          <input
            type="password"
            name="password1"
            placeholder={t("password")}
            onChange={this.handleChange}
          />
           <input
            type="password"
            name="password2"
            placeholder={t("repeat password")}
            onChange={this.handleChange}
          />
          <input type="submit" value={t("Create new password")} />
        </form>
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createNewPassword: (userPK, password) => dispatch(createNewPassword(userPK, password)),
    clearMessages: () => dispatch(resetLoginStatusMessages()),
  };
}

export default connect(null, mapDispatchToProps)(withTranslation()(NewPasswordForm));
