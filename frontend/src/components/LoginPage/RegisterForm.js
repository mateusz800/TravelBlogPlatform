import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { register } from "../../actions/profileActions";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password1: "", password2: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.setState({ mounted: true });
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password1 === this.state.password2) {
      this.props.submit(this.state.email, this.state.password1);
    }
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password1"
          placeholder="password"
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password2"
          placeholder="repeat password"
          onChange={this.handleChange}
        />
        <input type="submit" />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (email, password) => dispatch(register(email, password))
  };
}

export default connect(null, mapDispatchToProps)(RegisterForm);
