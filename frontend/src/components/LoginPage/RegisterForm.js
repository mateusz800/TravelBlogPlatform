import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import PolicyModal from "./PolicyModal.js";
import {
  register,
  resetLoginStatusMessages
} from "../../actions/profileActions";
import InputWarning from "./InputWarning";
import styles from "./styles.module.css";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password1: "",
      password2: "",
      passwordsEqual: true,
      policyIsOpen: false
    };
    props.clearMessages();
    this.passwordLengthWarning = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPasswordsEquality = this.checkPasswordsEquality.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
    } else if (password1 != password2) {
      this.setState({ passwordsEqual: false });
    } else {
      this.setState({ passwordsEqual: true });
    }
  }
  closeModal() {
    this.setState({ policyIsOpen: false });
  }
  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <PolicyModal open={this.state.policyIsOpen} close={this.closeModal}/>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <h5 className={styles.warning}>{this.props.status || " "}</h5>
          <input
            type="email"
            name="email"
            placeholder={t("email")}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder={t("first name")}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder={t("last name")}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password1"
            placeholder={t("password")}
            onChange={this.handleChange}
            required
          />
          <div>
            <input
              type="password"
              name="password2"
              placeholder={t("repeat password")}
              onChange={this.handleChange}
              required
            />
            <InputWarning
              message={t("Passwords are not the same")}
              display={!this.state.passwordsEqual}
            />
          </div>
          <div className={styles.agreements}>
            <input type="checkbox" name="agreement" value="I agree" required />
            <label for="agreement">
              {t("I agree to the ....nazwa....")}
              <a
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer"
                }}
                onClick={() => this.setState({ policyIsOpen: true })}
              >
                {t("Terms and Privacy Policy")}
              </a>
            </label>
            <br></br>
          </div>
          <input type="submit" value={t("register")} />
        </form>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.profiles.registerStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (email, password, firstName, lastName) =>
      dispatch(register(email, password, firstName, lastName)),
    clearMessages: () => dispatch(resetLoginStatusMessages())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(RegisterForm));
