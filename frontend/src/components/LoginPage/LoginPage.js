import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "./styles.module.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { showRegisterForm: props.login ? false : true };
    this.toogleForm = this.toogleForm.bind(this);
  }

  toogleForm() {
    this.setState({ showRegisterForm: !this.state.showRegisterForm });
  }

  render() {
    const showRegisterForm = this.state.showRegisterForm;
    return (
      <div>
        {!showRegisterForm && <LoginForm />}
        {showRegisterForm && <RegisterForm />}
        <div className={styles.toggleMode}>
          {showRegisterForm ? "Already have an account? " : "Don't have an account? "}
            <a onClick={this.toogleForm}>{showRegisterForm ? "login " : "register"}</a>
        </div>
      </div>
    );
  }
}

export default LoginPage;
