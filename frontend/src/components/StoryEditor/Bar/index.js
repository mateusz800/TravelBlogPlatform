import React from "react";
import ReactDOM from "react-dom";
import { faTimes} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tag: "" };
    this.onChange = this.onChange.bind(this);
    this.addTag = this.addTag.bind(this);
  }

  onChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  addTag(e) {
    e.preventDefault();
    this.props.addTagFunc(this.state.tag);
    const node = ReactDOM.findDOMNode(this);
    node.querySelector("input[name=tag]").value = "";
    this.setState({ tag: "" });
  }

  render() {
    const tags = this.props.tags.map(tag => (
      <div key={tag}>
        <span>#{tag} </span>
        <span  className={styles.x} onClick={()=>this.props.removeTagFunc(tag)}><FontAwesomeIcon icon={faTimes}/>&nbsp;</span>
      </div>
    ));
    return (
      <div className={styles.container}>
        <button onClick={this.props.previewFunc}> PREVIEW </button>
        <form onSubmit={this.addTag}>
          <input
            name="tag"
            type="text"
            onChange={this.onChange}
            placeholder="add tag"
          />
        </form>
        {tags}
      </div>
    );
  }
}

export default Bar;
