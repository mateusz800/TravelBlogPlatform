import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.module.css";

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, pages: props.children.length };
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.interval = setInterval(this.next, props.timeout);
  }
  /**
   *  Go to the next slide
   */
  next() {
    
    this.setState({ page: (this.state.page + 1) % this.state.pages });
  }
  /**
   *  Go to the previous slide
   */
  prev() {
    if(this.state.page > 0){
      this.setState({ page: this.state.page - 1});
    }
  }
  render() {
    const { children } = this.props;
    const { page } = this.state;
    return (
      <div className={styles.carousel}>
        <div className={styles.prevBtn} onClick={this.prev}>
        &lt;
        </div>
        <div className="content">{children[page]}</div>
        <div className={styles.nextBtn} onClick={this.next}>
        >
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  /* How much time (in ms) slides are displayed. If 0 then slides have to be changed manually */
  timeout: PropTypes.number.isRequired,
  /* Each child is a one slide */
  children: PropTypes.array
};

export default Carousel;
