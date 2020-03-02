import React, { Fragment } from "react";
import { stateToHTML } from "draft-js-export-html";
import { convertToRaw, convertFromHTML } from "draft-js";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../node_modules/medium-draft/lib/index.css";
import styles from "./styles.module.css";
import { Editor, createEditorState, RenderMap, Block } from "medium-draft";
import mediumDraftImporter from "medium-draft/lib/importer";
import mediumDraftExporter from "medium-draft/lib/exporter";
import {
  getStory,
  addStory,
  resetCurrentStory
} from "../../actions/storyActions";
import StoryHeaderForm from "./StoryHeaderForm/StoryHeaderForm";
import CustomImageSideButton from "./SideButtons/CustomImageSideButton";
import { photoTypes } from "../../actions/types";
import { convertToHTML } from "draft-convert";

class StoryEditor extends React.Component {
  statusCheckbox = null;
  rendererOptions = {
    blockRenderers: {
      atomic: block => {
        const data = block.getData();
        const src = data.get("src");
        return "<div>" + src + "</div>";
      }
    },
    defaultBlockTag: "div"
  };
  sideButtons = [
    {
      title: "Image",
      component: CustomImageSideButton
    }
  ];

  constructor(props) {
    super(props);
    this.state = { editorState: createEditorState(), authorized: true };
    this.refsEditor = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.getData = this.getData.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    //  preparing the story data fetching or removing (when user create new story)
    const { pk } = this.props.match.params;
    if (pk) {
      this.props.loadData(pk);
    } else {
      this.props.resetData();
    }

    if (this.props.story && this.props.story.status) {
      if (this.props.story.status === "published") {
        // updating checkbox that inform if the author want to make story public
        this.statusCheckbox.checked = true;
      }
    }
    this.refsEditor.current.focus();
  }

  componentDidUpdate(prevProps) {
    // showing data of a existing story
    if (this.props.story && this.props.story != prevProps.story) {
      console.log(convertToRaw(mediumDraftImporter(this.props.story.body)));
      this.setState({
        editorState: createEditorState(
          convertToRaw(mediumDraftImporter(this.props.story.body))
        ),
        title: this.props.story.title,
        subtitle: this.props.subtitle
      });
      if (
        !prevProps.story ||
        this.props.story.status != prevProps.story.status
      ) {
        this.setState({ status: this.props.story.status });
        if (this.props.story.status === "published") {
          this.statusCheckbox.checked = true;
        }
        if (this.props.userPK != this.props.story.author.pk) {
          this.setState({ authorized: false });
        }
      }
    }
    // adding block with photo
    if (this.props.newPhoto != prevProps.newPhoto) {
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
    /*
    const renderedHTML = mediumDraftExporter(
      editorState.getCurrentContent(),
    );
    */
    const renderedHTML = stateToHTML(editorState.getCurrentContent(), {
      blockRenderers: {
        [Block.IMAGE]: (block) => {
          const src = block.getData()._root.entries[0][1];
          return `<img src="${src}"/>`
        },
      }
    });
    console.log(renderedHTML);
    let data = {
      title: this.state.title,
      subtitle: this.state.subtitle,
      body: renderedHTML,
      author: 1,
      photo: this.state.photo,
      status: this.state.status ? this.state.status : "draft"
    };
    if (this.props.story) {
      data["pk"] = this.props.story.pk;
    }
    this.props.addStory(data);
  }

  render() {
    const { editorState, authorized } = this.state;
    if (!authorized) {
      return <Redirect to="/404" />;
    }
    return (
      <Fragment>
        {this.props.story && this.props.story.photo && (
          <StoryHeaderForm
            title={this.props.story.title}
            subtitle={this.props.story.subtitle}
            updateData={this.getData}
            photo={this.props.story.photo.source}
          />
        )}
        {!this.props.story && <StoryHeaderForm updateData={this.getData} />}
        <button onClick={this.save}>Save</button>
        <label for="status">Publish</label>
        <input
          type="checkbox"
          name="status"
          value="published"
          onChange={e => {
            this.setState({
              status: this.state.status === "draft" ? "published" : "draft"
            });
          }}
          defaultChecked={this.state.status === "published" ? true : false}
          ref={inputRef => {
            this.statusCheckbox = inputRef;
          }}
        />
        <div className={styles.editor}>
          <Editor
            ref={this.refsEditor}
            editorState={editorState}
            onChange={this.onChange}
            sideButtons={this.sideButtons}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    story: state.stories.currentStory,
    userPK: state.profiles.user_pk,
    newPhoto: state.media[`new_${photoTypes.STORY_PHOTO}_photo`]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadData: pk => dispatch(getStory(pk)),
    resetData: () => dispatch(resetCurrentStory()),
    addStory: data => dispatch(addStory(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditor);
