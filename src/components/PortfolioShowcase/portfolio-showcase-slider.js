import React, { useState } from 'react';
import Slider from '@ant-design/react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PortfolioShowcaseSlide from './portfolio-showcase-slide';
import PortfolioShowcaseTag from './portfolio-showcase-tag';
import PortfolioShowcaseDetails from './portfolio-showcase-details';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './portfolio-showcase-slider.module.css';

const PortfolioShowcaseSlider = ({ entries }) => {
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [imageColFadeClass, setImageColFadeClass] = useState(styles.fadeIn);
  const [showDetails, setShowDetails] = useState(false);

  // NEED handler for toggling between the slider and the details
  // -will allow for animation that fades the elements out/in
  //
  //
  //
  //

  // making sure the slider/details column element that is visible is also on top of the other element
  // -should be a cleaner way to do this with the css modules but haven't gotten that to work yet
  const zIndexSlider = showDetails ? { zIndex: -1 } : { zIndex: 1 }; 
  const zIndexDetails = showDetails ? { zIndex: 1 } : { zIndex: -1 };

  if (!entries) return null;
  if (!Array.isArray(entries)) return null;

  let currSlide;
  let currImg;
  let currTechTags;
  if (entries[currentEntryIndex]) {
    let currSlide = entries[currentEntryIndex];
    currImg = currSlide.featuredImage;
    currTechTags = currSlide.techTags;
  }

  // react-slick Slider settings
  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    centerPadding: "0px",
    speed: 1000,
    focusOnSelect: true,
    vertical: true,
    beforeChange: (current, next) => {
      if (current === next) return;
      setImageColFadeClass(styles.fadeOut);
      setTimeout(() => {
        setCurrentEntryIndex(next);
        setImageColFadeClass(styles.fadeIn);
      }, 500); // Match the duration of the CSS transition in portfolio-showcase-slider.module.css
    },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <div className={styles.previewImageWrap}>
            <GatsbyImage className={`${styles.gatsbyImage} ${imageColFadeClass}`} image={currImg.gatsbyImage} alt={currImg.alt} />
          </div>
          <div className={`${styles.tagsWrap} ${imageColFadeClass}`}>
            {currTechTags?.map((tag, index) => {
              return <PortfolioShowcaseTag key={index} tag={tag} />
            })}
          </div>
        </div>
        <div className="col-md-5">
          <Slider {...settings} className={showDetails ? styles.fadeOut : styles.fadeIn} style={zIndexSlider}>
            {entries.map((entry, index) => <PortfolioShowcaseSlide key={entry.slug} entry={entry} thisSlideIndex={index} currSlideIndex={currentEntryIndex} setShowDetails={setShowDetails} />)}
          </Slider>
          <div className={showDetails ? styles.fadeIn : styles.fadeOut} style={zIndexDetails}>
            <PortfolioShowcaseDetails entry={currSlide} showDetails={showDetails} setShowDetails={setShowDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcaseSlider;
