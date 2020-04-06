import React, { Component, Fragment, useState } from "react";
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import ItemsCarousel from "react-items-carousel";
import Card from "../../Card/Card";
import TruncuatedText from "../../TruncuatedText/TruncuatedText";
import styles from "./styles.module.css";

const StorySlider = ({ stories, currentUserPK }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const elements = stories.map(story => (
    <Link to={`/story/${story.pk}`} key={story.pk}>
      <Card
        key={story.pk}
        title={story.title}
        subtitle={story.subtitle}
        image={story.photo.source}
        date={story.published_date}
        author={story.author}
        height="375px"
        owner={currentUserPK && currentUserPK == story.author.pk}
        pk={story.pk}
      >
        <TruncuatedText lines={3} text={story.body} />
      </Card>
    </Link>
  ));
  return (
    <div
      className={styles.container}
      style={{ padding: `0 ${chevronWidth}px` }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {elements}
      </ItemsCarousel>
    </div>
  );
};

function mapStateToProps(state){
  return {
    currentUserPK: state.profiles.user_pk
  }
}

export default connect(mapStateToProps)(StorySlider);
