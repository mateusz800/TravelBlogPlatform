import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/profileActions";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const {email, password} = this.state;
    this.props.login(email, password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
        <input type="submit" />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
}

export default connect(null, mapDispatchToProps)(LoginForm);
