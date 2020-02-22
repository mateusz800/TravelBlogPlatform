import React, { Fragment } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertToRaw } from "draft-js";
import { connect } from "react-redux";
import "../../../node_modules/medium-draft/lib/index.css";
import styles from "./styles.module.css";
import { Editor, createEditorState, EditorState } from "medium-draft";
import mediumDraftImporter from "medium-draft/lib/importer";
import { getStory, addStory } from "../../actions/storyActions";
import StoryHeaderForm from "./StoryHeaderForm/StoryHeaderForm";

class ArticleEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: createEditorState() };
    this.refsEditor = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.getData = this.getData.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    const { pk } = this.props.match.params;
    if (pk) {
      this.props.loadData(pk);
    }
    this.refsEditor.current.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.story != prevProps.story) {
      this.setState({
        editorState: createEditorState(
          convertToRaw(mediumDraftImporter(this.props.story.body))
        ),
        title:this.props.story.title,
        subtitle:this.props.subtitle
      });
    }
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  getData(name, value) {
    this.setState({ [name]: value });
  }

  save() {
    const editorState = this.state.editorState;
    const renderedHTML = stateToHTML(editorState.getCurrentContent());
    let data = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: renderedHTML,
      author: 1,
      photo: this.state.photo
    };
    if(this.props.story){
      data['pk'] = this.props.story.pk
    }
    this.props.addStory(data);
  }

  render() {
    const { editorState } = this.state;
    return (
      <Fragment>
        {this.props.story && (
          <StoryHeaderForm
            title={this.props.story.title}
            updateData={this.getData}
            photo={this.props.story.photo.source}
          />
        )}
        {!this.props.story && <StoryHeaderForm updateData={this.getData} />}
        <div className={styles.editor}>
          <button onClick={this.save}>Save</button>
          <Editor
            ref={this.refsEditor}
            editorState={editorState}
            onChange={this.onChange}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    story: state.stories.currentStory,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getStory(pk)),
    addStory: data => dispatch(addStory(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleEditor);
