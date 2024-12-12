import React, { useState } from 'react';
import Slider from '@ant-design/react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PortfolioShowcaseSlide from './portfolio-showcase-slide';
import PortfolioShowcaseTag from './portfolio-showcase-tag';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './portfolio-showcase-slider.module.css';

const PortfolioShowcaseSlider = ({ entries }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageColFadeClass, setImageColFadeClass] = useState(styles.fadeIn);
  const [showDetails, setShowDetails] = useState(false);
  const [sliderColFadeClass, setSliderColFadeClass] = useState(styles.fadeIn);

  if (!entries) return null;
  if (!Array.isArray(entries)) return null;

  let currSlug;
  let currImg;
  let currTechTags;
  if (entries[currentSlide]) {
    const currSlide = entries[currentSlide];
    currSlug = currSlide.slug;
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
      setImageColFadeClass(styles.fadeOut);
      setTimeout(() => {
        setCurrentSlide(next);
        setImageColFadeClass(styles.fadeIn);
      }, 500); // Match the duration of the CSS transition in portfolio-showcase-slider.module.css
    },
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7">
          <a className={styles.previewImageLink} href={`/portfolio/${currSlug}`}>
            <GatsbyImage className={`${styles.gatsbyImage} ${imageColFadeClass}`} image={currImg.gatsbyImage} alt={currImg.alt} />
          </a>
          <div className={`${styles.tagsWrap} ${imageColFadeClass}`}>
            {currTechTags?.map((tag, index) => {
              return <PortfolioShowcaseTag key={index} tag={tag} />
            })}
          </div>
        </div>
        <div className="col-md-5">
          <Slider {...settings}>
            {entries.map((entry, index) => <PortfolioShowcaseSlide key={entry.slug} entry={entry} slideIndex={index} currSlide={currentSlide} setShowDetails={setShowDetails} />)}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcaseSlider;
