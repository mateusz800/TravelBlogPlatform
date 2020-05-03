import React from "react";
import { withTranslation } from "react-i18next";
import Modal from "react-modal";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class PolicyModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalIsOpen: props.open ? true : false };
    Modal.setAppElement("body");
  }
  componentDidUpdate(prevProps) {
    if (prevProps.open != this.props.open) {
      this.setState({ modalIsOpen: this.props.open });
    }
  }
  render() {
    const { close, t } = this.props;
    return (
      // https://github.com/reactjs/react-modal
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={close}
        contentLabel="Example Modal"
      >
        <FontAwesomeIcon icon={faTimesCircle} onClick={close} style={{cursor:'pointer'}} />
        <h2>{t("Terms and Privacy Policy")}</h2>
      </Modal>
    );
  }
}

export default withTranslation()(PolicyModal);
