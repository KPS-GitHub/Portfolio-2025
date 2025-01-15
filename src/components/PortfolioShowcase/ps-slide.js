import React from 'react';
import * as styles from './ps-slide.module.css';
import { get } from 'lodash';

const PortfolioShowcaseSlide = ({ entry, thisSlideIndex, currSlideIndex, setShowDetails, detailsViewToggle }) => {
  const title = get(entry, 'title', null);
  const titleLength = title.length;

  const calculateFontSize = (length) => {
    if (length <= 10) return '2rem';
    if (length <= 20) return '1.75rem';
    if (length <= 30) return '1.5rem';
    return '1.25rem';
  };

  const fontSize = calculateFontSize(titleLength);

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