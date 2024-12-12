import React from 'react'
import * as styles from './portfolio-showcase-slide.module.css'

const PortfolioShowcaseSlide = ({ entry, slideIndex, currSlide, setShowDetails }) => {

    return (
        <div className={`${styles.slideOuterWrap} ${currSlide === slideIndex ? styles.currentSlide : ''}`}>
            <div className={styles.slideWrap}>
                <h2>{entry.title}</h2>
                <button className={styles.viewDetailsButton}>View Details</button>
            </div>
        </div>

    )
}

export default PortfolioShowcaseSlide;