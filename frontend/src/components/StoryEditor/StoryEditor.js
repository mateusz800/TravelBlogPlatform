import React, { Fragment } from "react";
import { convertToRaw } from "draft-js";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next"
import { Redirect } from "react-router-dom";
import "../../../node_modules/medium-draft/lib/index.css";
import styles from "./styles.module.css";
import { Editor, createEditorState, Block } from "medium-draft";
import mediumDraftImporter from "medium-draft/lib/importer";
import mediumDraftExporter from "medium-draft/lib/exporter";
import {
  getStory,
  addStory,
  resetCurrentStory,
  addTag,
  removeTag
} from "../../actions/storyActions";
import StoryHeaderForm from "./StoryHeaderForm/StoryHeaderForm";
import CustomImageSideButton from "./SideButtons/CustomImageSideButton";

import { photoTypes } from "../../actions/types";
import Bar from "./Bar";

class StoryEditor extends React.Component {
  statusCheckbox = null;
  rendererOptions = {
    blockRenderers: {
      [Block.IMAGE]: block => {
        const src = block.getData()._root.entries[0][1];
        return `<div style='width:100%; display:flex; justify-content:center'><img src="${src}"/></div>`;
      }
    }
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
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.showPreview = this.showPreview.bind(this);
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
      this.setState({ status: this.props.story.status });
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
  }

  onChange(editorState) {
    this.setState({ editorState });
  }

  getData(name, value) {
    // get data from StoryHeaderForm components
    this.setState({ [name]: value });
  }

  save() {
    /* Send data to the database */
    const editorState = this.state.editorState;
    const renderedHTML = mediumDraftExporter(editorState.getCurrentContent());
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

  showPreview() {
    /* Save work and show how others see story */
    this.save();
    if(this.props.story){
      this.props.history.push(`/story/${this.props.story.pk}`);
    }
    
  }

  addTag(tag) {
    /* Add tag to the story */
    const story_pk = this.props.story.pk;
    this.props.addTag(story_pk, tag);
    this.props.loadData(story_pk);
  }
  removeTag(tag){
    /* remove tag from the story */
    const story_pk = this.props.story.pk;
    this.props.removeTag(story_pk, tag);
  }

  render() {
    const { editorState, authorized, } = this.state;
    const {story, t} = this.props;
    if (!authorized) {
      return <Redirect to="/404" />;
    }
    return (
      <Fragment>
        {story && story.photo && (
          <StoryHeaderForm
            title={story.title}
            subtitle={story.subtitle}
            updateData={this.getData}
            photo={story.photo.source}
          />
        )}
        {!story && <StoryHeaderForm updateData={this.getData} />}
        { <Bar
          previewFunc={this.showPreview}
          addTagFunc={this.addTag}
          removeTagFunc={this.removeTag}
          tags={story? story.tags: null}
        />}
        <label for="status">{t("Publish")}</label>
        <input
          type="checkbox"
          name="status"
          value="published"
          onChange={e => {
            if (this.state.status) {
              this.setState({
                status: this.state.status === "draft" ? "published" : "draft"
              });
            }
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
    addStory: data => dispatch(addStory(data)),
    addTag: (story_pk, tag) => dispatch(addTag(story_pk, tag)),
    removeTag: (story_pk, tag) => dispatch(removeTag(story_pk, tag))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(StoryEditor));
