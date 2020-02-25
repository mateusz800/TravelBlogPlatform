import React, { Component, Fragment } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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
        <button onClick={this.toogleForm}>
          {showRegisterForm ? "login" : "register"}
        </button>
      </div>
    );
  }
}

export default LoginPage;
