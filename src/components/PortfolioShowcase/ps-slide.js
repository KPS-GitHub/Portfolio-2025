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

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const calculateFontSize = (length, width, height) => {
    let baseFontSize;
    if (length <= 10) baseFontSize = 3;
    else if (length <= 20) baseFontSize = 2.9;
    else if (length <= 30) baseFontSize = 2.8;
    else baseFontSize = 2.5;

    if (width <= 555 || height <= 300) return `${baseFontSize - 1.75}rem`;
    if (width <= 767 || height <= 400) return `${baseFontSize - 1.5}rem`;
    if (width <= 991 || height <= 700) return `${baseFontSize - 1}rem`;
    return `${baseFontSize}rem`;
  };

  const fontSize = calculateFontSize(titleLength, windowDimensions.width, windowDimensions.height);

  return (
    <div className={`${styles.slideOuterWrap} ${currSlideIndex === thisSlideIndex ? styles.currentSlide : ''}`}>
      <div className={styles.slideWrap}>
        <h2 style={{ fontSize }}>{title}</h2>
        <button onClick={() => setShowDetails(true)} className={`button-clean ${styles.viewDetailsButton}`}>View Details</button>
      </div>
    </div>
  );
};

export default PortfolioShowcaseSlide;