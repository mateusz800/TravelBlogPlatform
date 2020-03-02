import React, { Component } from "react";

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  render() {
    return (
      <form>
        
      </form>
    );
  }
}

export default SettingsForm;
