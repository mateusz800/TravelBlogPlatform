import React, { Component } from "react";
import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor
} from "medium-draft";
import { uploadPhoto, uploadPhotoFn } from "../../../actions/mediaActions";
import { connect } from "react-redux";
import { photoTypes } from "../../../actions/types";
import "isomorphic-fetch";

class CustomImageSideButton extends ImageSideButton {
  onChange(e) {
    const file = e.target.files[0];
    uploadPhotoFn(file).then(res => {
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src: res.url
        })
      );
      this.props.close();
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    uploadPhoto: (photo, type) => dispatch(uploadPhoto(photo, type))
  };
}

export default connect(null, mapDispatchToProps)(CustomImageSideButton);
