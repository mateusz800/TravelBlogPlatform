import React from "react";

import styles from "./styles.module.css";

class FadeInSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0, prevIndex:0,  currentStageClass: styles.active };
    this.next = this.next.bind(this);
    this.interval = setInterval(this.next, this.props.speed);
  }

  next() {
    let nextIndex = 0;
    const { activeIndex } = this.state;
    if (activeIndex + 1 < this.props.children.length) {
      nextIndex = activeIndex + 1;
    }
    this.setState({currentStageClass: styles.exit})

    setTimeout(() => {
      this.setState({ activeIndex: nextIndex });
      this.setState({currentStageClass: styles.active})
    }, 1000);
  }

  render() {
    const slides = this.props.children;
    const { activeIndex, currentStageClass } = this.state;
    return (
      <div className={styles.container}>
        <div className={currentStageClass}>{slides[activeIndex]}</div>
      </div>
    );
  }
}

export default FadeInSlider;
