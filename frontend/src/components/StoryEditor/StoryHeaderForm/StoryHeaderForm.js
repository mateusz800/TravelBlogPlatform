import React, { Component, Fragment } from "react";
import { withTranslation } from "react-i18next";
import Image from "../../Image/Image";
import styles from "./styles.module.css";
import { uploadPhoto } from "../../../actions/mediaActions";
import { connect } from "react-redux";
import { photoTypes } from "../../../actions/types";

class StoryHeaderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "", subtitle: "" };

    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const { title, subtitle, photo } = this.props;
    if (title) {
      this.setState({ title: title });
    }
    if (subtitle) {
      this.setState({ subtitle: subtitle });
    }
    if (photo) {
      this.setState({ photo: photo });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.newPhoto != prevProps.newPhoto) {
      this.setState({ photo: this.props.newPhoto.url });
      this.props.updateData("photo", this.props.newPhoto.pk);
    }
  }

  handleChange(e) {
    const name = e.target.name;
    if (name === "photo") {
      this.props.uploadPhoto(e.target.files[0], photoTypes.STORY_COVER_PHOTO);
      return;
    }
    this.setState({ [name]: e.target.value });
    this.props.updateData(name, e.target.value);
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <Image
          height="95vh"
          brightness={50}
          src={this.state.photo ? this.state.photo : ""}
        />
        <div className={styles.generalInfo}>
          <input
            name="title"
            type="text"
            placeholder={t("title")}
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            name="subtitle"
            type="text"
            placeholder={t("subtitle")}
            value={this.state.subtitle}
            onChange={this.handleChange}
          />
          <input name="photo" type="file" onChange={this.handleChange} />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    newPhoto: state.media[`new_${photoTypes.STORY_COVER_PHOTO}_photo`]
  };
}

function mapDispatchToProps(dispatch) {
  return {
    uploadPhoto: (file, type) => dispatch(uploadPhoto(file, type))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(StoryHeaderForm));
