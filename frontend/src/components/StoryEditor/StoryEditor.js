import React from "react";
import { stateToHTML } from 'draft-js-export-html';
import "../../../node_modules/medium-draft/lib/index.css";
import styles from "./styles.module.css";

// if using webpack
// import 'medium-draft/lib/index.css';

import { Editor, createEditorState } from "medium-draft";
import { getStory } from "../../actions/storyActions";

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEditorState() };
    /*
    this.state = {
      editorState: createEditorState(data), // with content
    };
    */
    this.refsEditor = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const {pk} = this.props.match.params;
    if(pk){

    }
    this.refsEditor.current.focus();
  }
  onChange(editorState) {
    this.setState({ editorState });
  }
  save(){
    const editorState = this.state.editorState
    const renderedHTML = stateToHTML(editorState.getCurrentContent())
    console.log(renderedHTML);
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className={styles.editor}>
        <button onClick={this.save}>Save</button>
        <Editor
          ref={this.refsEditor}
          editorState={editorState}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  
}

function mapDispatchToProps(dispatch){
  return {
    loadData: pk => dispatch(getStory(pk))
  }
}

export default ArticleEditor;
