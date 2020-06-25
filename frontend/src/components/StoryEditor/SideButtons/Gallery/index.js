import React from "react";
import { connect } from "react-redux";
import { Block, addNewBlock } from "medium-draft";
import Modal from "react-modal";
import { getUserMedia } from "../../../../actions/mediaActions";
import { uploadPhoto, uploadPhotoFn } from "../../../../actions/mediaActions";
import { withTranslation } from "react-i18next";
import { photoTypes } from "../../../../actions/types";
import styles from "./styles.module.css";
import image from "medium-draft/lib/components/blocks/image";

export const imageType = {
  storyCover: 1,
  storyPhoto: 2,
  profileBackground: 3,
  profilePhoto: 4,
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    props.getMedia(props.userPK);
    this.state = {
      showModal: false,
      imageType: props.imageType || imageType.storyPhoto,
    };
    this.addPhoto = this.addPhoto.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }
  componentDidUpdate(prevProps){
    if(this.props.media != prevProps.media){
      this.setState({selected:this.props.media[0].source});
    }
  }
  /*
  Add photo to the story
  */
  addPhoto() {
    const { addFunc } = this.props;
    const imageTypeProp = this.state.imageType;
    if (imageTypeProp == imageType.storyPhoto) {
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src: this.state.selected,
        })
      );
    } else {
      console.log(this.state.selected);
      addFunc(this.state.selected);
    }

    this.setState({ showModal: false });
  }

  uploadPhoto(e) {
    const file = e.target.files[0];
    uploadPhotoFn(file, this.props.userPK).then((res) => {
      this.props.getMedia(this.props.userPK);
    });
  }

  handleChange(e) {
    this.setState({ selected: e.target.value });
  }

  render() {
    const { t } = this.props;
    if (!this.state.showModal) {
      return (
        <div
          className="gallery-btn"
          onClick={() => this.setState({ showModal: true })}
        >
          {t("Photo")}
        </div>
      );
    } else {
      const media = this.props.media.map((elem) => {
        return (
          <label key={elem.source} className={styles.element}>
            <input
              type="radio"
              name="media"
              value={elem.source}
              onChange={this.handleChange}
              checked={elem.source==this.state.selected ? true:false}
            />
            <img src={elem.source} />
          </label>
        );
      });
      return (
        <div className={styles.container}>
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={close}
            contentLabel="Example Modal"
          >
            <div className={styles.topMenu}>
              <input type="file" onChange={this.uploadPhoto} />
            </div>
            <div class={styles.selectedImage}>
              <img src={this.state.selected || this.props.media[0].source}/>
              <input type="button" value={t('remove photo')}/>
            </div>
            <div className={styles.list}>{media}</div>
            <div className={styles.bottomMenu}>
              <button onClick={() => this.setState({ showModal: false })}>
                {t("Cancel")}
              </button>
              <button onClick={this.addPhoto}>{t("add")}</button>
            </div>
          </Modal>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMedia: (userPK) => dispatch(getUserMedia(userPK)),
    uploadPhoto: (photo, type, userPK) =>
      dispatch(uploadPhoto(photo, type, userPK)),
  };
}

function mapStateToProps(state) {
  return {
    media: state.media.userMedia,
    userPK: state.profiles.user_pk,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Gallery));
