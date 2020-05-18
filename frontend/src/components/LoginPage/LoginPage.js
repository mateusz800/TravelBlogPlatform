import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./styles.module.css";
import ResetPasswordForm from "./ResetPasswordForm";
import NewPasswordForm from "./NewPasswordForm";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { form: props.type, userPK:props.match.params.userPK };
    this.toogleForm = this.toogleForm.bind(this);
  }

  toogleForm() {
    // toogle form between login and register
    if (this.state.form == "login") {
      this.setState({ form: "register" });
    } else if (this.state.form == "register") {
      this.setState({ form: "login" });
    }
  }

  render() {
    const {form, userPK} = this.state;
    const { t } = this.props;
    return (
      <div>
        {form == "login" && <LoginForm />}
        {form == "reset password" && <ResetPasswordForm />}
        {form == "new password" && (
          <NewPasswordForm userPK={userPK} />
        )}
        {form == "register" && <RegisterForm />}
        {form != "reset password" && (
          <div className={styles.toggleMode}>
            {form == "register"
              ? t("Already have an account? ")
              : t("Don't have an account? ")}
            <a onClick={this.toogleForm}>
              {form == "register" ? t("login") : t("register")}
            </a>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(withTranslation()(LoginPage));
