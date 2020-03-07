import { ImageSideButton, Block, addNewBlock } from "medium-draft";
import { uploadPhoto, uploadPhotoFn } from "../../../actions/mediaActions";
import { connect } from "react-redux";
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
