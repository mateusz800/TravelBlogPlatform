import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ItemsCarousel from "react-items-carousel";
import Card from "../../Card/Card";
import TruncuatedText from "../../TruncuatedText/TruncuatedText";
import styles from "./styles.module.css";

const StorySlider = ({ stories }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numberOfCards, setNumberOfCards] = useState(
    parseInt(window.outerWidth / 300)
  );
  const chevronWidth = 40;
  const elements = stories.map((story) => (
    <Link to={`/story/${story.pk}`} key={story.pk}>
      <Card
        key={story.pk}
        title={story.title}
        subtitle={story.subtitle}
        image={story.photo.source}
        date={story.published_date}
        author={story.author}
        height="375px"
        pk={story.pk}
      >
        <TruncuatedText lines={3} text={story.body} />
      </Card>
    </Link>
  ));
  const handleResize = () => {
    setNumberOfCards(parseInt(window.outerWidth / 300));
    setActiveItemIndex(0);
  };
  window.addEventListener("resize", handleResize);
  return (
    <div className={styles.container}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={numberOfCards}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
        firstAndLastGutter={true}
        slidesToScroll={1}
      >
        {elements}
      </ItemsCarousel>
    </div>
  );
};

export default StorySlider;
