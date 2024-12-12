import React from 'react'
import * as styles from './portfolio-showcase-slide.module.css'

const PortfolioShowcaseSlide = ({ entry, thisSlideIndex, currSlideIndex, setShowDetails }) => {

    return (
        <div className={`${styles.slideOuterWrap} ${currSlideIndex === thisSlideIndex ? styles.currentSlide : ''}`}>
            <div className={styles.slideWrap}>
                <h2>{entry.title}</h2>
                <button onClick={() => setShowDetails(true)} className={`button-clean ${styles.viewDetailsButton}`}>View Details</button>
            </div>
        </div>

    )
}

export default PortfolioShowcaseSlide;