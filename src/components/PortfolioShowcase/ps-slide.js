import React, { useState, useEffect } from 'react';
import * as styles from './ps-slide.module.css';
import { get } from 'lodash';

const PortfolioShowcaseSlide = ({ entry, thisSlideIndex, currSlideIndex, setShowDetails, detailsViewToggle }) => {
  const title = get(entry, 'title', null);
  const titleLength = title.length;

  // Note: need to check that window is defined before using it so that the site can be rendered server-side
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

  }, []);

  const calculateFontSize = (length, windowWidth, windowHeight) => {
    let baseFontSize = 2.5 - (length / 50); // base font size is 2.5rem, but decreases as title length increases

    if (windowWidth <= 355 || windowHeight <= 300) return `${baseFontSize - 1}rem`;
    if (windowWidth <= 768 || windowHeight <= 400) return `${baseFontSize - .75}rem`;
    if (windowWidth <= 991 || windowHeight <= 700) return `${baseFontSize - .6}rem`;
    return `${baseFontSize}rem`;
  };

  const fontSize = calculateFontSize(titleLength, windowDimensions.width, windowDimensions.height);

  return (
    <div className={`${styles.slideOuterWrap} ${currSlideIndex === thisSlideIndex ? styles.currentSlide : ''}`}>
      <div className={styles.slideWrap}>
        <h2 style={{ fontSize }}>{title}</h2>
        <div className={styles.buttonsWrap}>
          <button onClick={() => setShowDetails(true)} className={`button-clean accent-shadow ${styles.viewDetailsButton}`}>View Details</button>
          &nbsp; &nbsp;
          <a href={entry.websiteUrl} target="_blank" rel="noreferrer" className={`button-clean accent-shadow ${styles.visitSiteButton}`}>Visit Site</a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioShowcaseSlide;