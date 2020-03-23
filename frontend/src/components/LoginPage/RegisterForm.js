import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { register, resetLoginStatusMessages } from "../../actions/profileActions";
import InputWarning from "./InputWarning";
import styles from "./styles.module.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      passwordsEqual: true
    };
    props.clearMessages();
    this.passwordLengthWarning = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswordsEquality = this.checkPasswordsEquality.bind(this);
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (name === "password2") {
      this.checkPasswordsEquality(this.state.password1, e.target.value);
    } else if (name === "password1") {
      this.checkPasswordsEquality(e.target.value, this.state.password2);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password1 === this.state.password2) {
      this.props.submit(
        this.state.email,
        this.state.password1,
        this.state.firstName,
        this.state.lastName
      );
    }
  }
  checkPasswordsEquality(password1, password2) {
    // Check if given passwords are the same.
    if (password2 === "") {
      this.setState({ passwordsEqual: true });
    }
    else if (password1 != password2) {
      this.setState({ passwordsEqual: false });
    } else {
      this.setState({ passwordsEqual: true });
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <h5 className={styles.warning}>{this.props.status || " "}</h5>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="firstName"
          placeholder="first name"
          onChange={this.handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="last name"
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
          name="password1"
          placeholder="password"
          onChange={this.handleChange}
          required
        />
        <div>
          <input
            type="password"
            name="password2"
            placeholder="repeat password"
            onChange={this.handleChange}
            required
          />
          <InputWarning
            message="Passwords are not the same"
            display={!this.state.passwordsEqual}
          />
        </div>
        <input type="submit" value="register" />
      </form>
    );
  }
}

function mapStateToProps(state){
  return {
    status: state.profiles.registerStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (email, password, firstName, lastName) =>
      dispatch(register(email, password, firstName, lastName)),
    clearMessages: () => dispatch(resetLoginStatusMessages())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
