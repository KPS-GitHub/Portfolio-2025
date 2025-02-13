import React, { useState, useEffect, useRef } from 'react';
import Slider from '@ant-design/react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PortfolioShowcaseSlide from './ps-slide';
import PortfolioShowcaseDetails from './ps-details';
import { GatsbyImage } from 'gatsby-plugin-image';
import * as styles from './ps-slider.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PortfolioShowcaseTags from './ps-tags';

const PortfolioShowcaseSlider = ({ entries }) => {
  // ref to enable prev/next buttons on mobile slider
  const slider = useRef(null);

  const [currentEntryIndex, setCurrentEntryIndex] = useState(0);
  const [imageColFadeClass, setImageColFadeClass] = useState(styles.fadeIn);
  const [showDetails, setShowDetails] = useState(false);
  const [sliderFadeClass, setSliderFadeClass] = useState(styles.detailsColFadeIn);
  const [detailsFadeClass, setDetailsFadeClass] = useState(styles.detailsColFadeOut);

  // fade out/in transition for the slider/details column
  useEffect(() => {
    if (showDetails) {
      setSliderFadeClass(styles.detailsColFadeOut);
      setTimeout(() => {
        setDetailsFadeClass(styles.detailsColFadeIn);
      }, 500); // Match the duration of the CSS transition
    } else {
      setDetailsFadeClass(styles.detailsColFadeOut);
      setTimeout(() => {
        setSliderFadeClass(styles.detailsColFadeIn);
      }, 500); // Match the duration of the CSS transition
    }
  }, [showDetails]);

  if (!entries) return null;
  if (!Array.isArray(entries)) return null;

  let currSlide;
  let currImg;
  let currTechTags;
  if (entries[currentEntryIndex]) {
    currSlide = entries[currentEntryIndex];
    currImg = currSlide.featuredImage;
    currTechTags = currSlide.techTags;
  }

  // react-slick Slider settings
  const settings = {
    dots: false,
    arrows: false,
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    centerPadding: "40px",
    focusOnSelect: true,
    draggable: true,
    vertical: true,
    speed: 1000,
    edgeFriction: 0.35,
    swipeToSlide: true,
    beforeChange: (current, next) => {
      if (current === next) return;
      setImageColFadeClass(styles.fadeOut);
      setTimeout(() => {
        setCurrentEntryIndex(next);
        setImageColFadeClass(styles.fadeIn);
      }, 500); // Match the duration of the CSS transition in portfolio-showcase-slider.module.css
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          buttons: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          vertical: false,
          focusOnSelect: true
        }
      },
      {
        breakpoint: 555,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          vertical: false,
          focusOnSelect: false,
          centerMode: true
        }
      }
    ]
  };

  return (
    <div className={`container ${styles.sliderWrap} ${showDetails ? styles.sliderWrapDetailsShow : ''}`}>
      {/* <div className='row hide-on-desktop'>
        <div className='col-md-12'>
          <h2 className={`${styles.sectionTitle} block-accent-pink`}>Portfolio</h2>
        </div>
      </div> */}
      <div className="row">
        <div className={`col-md-6 order-md-1 order-2 ${styles.imageCol}`}>
          <div
            className={styles.previewImageWrap}
          >
            <GatsbyImage
              className={`${styles.gatsbyImage} ${imageColFadeClass} ${currentEntryIndex % 2 === 0 ? 'block-accent-green' : 'block-accent-pink'}`}
              image={currImg.gatsbyImage}
              alt={currImg.title}
              objectFit="contain"
            />
            <div className={`${styles.sliderButtonsWrap} hide-on-mobile`}>
              <button className={`${styles.sliderButton} ${styles.sliderButtonPrev}`} onClick={() => slider?.current?.slickPrev()} aria-label='previous portfolio entry'><FaChevronLeft /></button>
              <button className={`${styles.sliderButton} ${styles.sliderButtonNext}`} onClick={() => slider?.current?.slickNext()} aria-label='next portfolio entry'><FaChevronRight /></button>
            </div>
          </div>
          <div className={`${styles.tagsWrap} ${imageColFadeClass}`}>
            {currTechTags ? <PortfolioShowcaseTags tags={currTechTags} /> : null}
          </div>
        </div>
        <div className="col-md-1 order-md-2 order-3"></div>
        <div className={`col-md-5 order-md-3 order-1 block-accent-blue hide-accent-mobile ${styles.sliderRightWrap}`}>
          <button className={`${styles.sliderButton} ${styles.sliderButtonPrev} ${showDetails ? 'hide' : ''} hide-on-desktop`} onClick={() => slider?.current?.slickPrev()} aria-label='previous portfolio entry'><FaChevronLeft /></button>
          <Slider ref={slider} {...settings} className={`${sliderFadeClass}`}>
            {entries.map((entry, index) => <PortfolioShowcaseSlide key={entry.slug} entry={entry} thisSlideIndex={index} currSlideIndex={currentEntryIndex} setShowDetails={setShowDetails} />)}
          </Slider>
          <button className={`${styles.sliderButton} ${styles.sliderButtonNext} ${showDetails ? 'hide' : ''} hide-on-desktop`} onClick={() => slider?.current?.slickNext()} aria-label='next portfolio entry'><FaChevronRight /></button>
          <div className={`${detailsFadeClass} ${showDetails ? styles.detailsColShow : styles.detailsColHide}`}>
            <PortfolioShowcaseDetails entry={currSlide} index={currentEntryIndex} showDetails={showDetails} setShowDetails={setShowDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcaseSlider;
