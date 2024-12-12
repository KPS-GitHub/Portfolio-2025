import React from 'react'
import * as styles from './portfolio-showcase-slide.module.css'

const PortfolioShowcaseSlide = ({ entry, slideIndex, currSlide }) => {

    return (
        <div className={`${styles.slideOuterWrap} ${currSlide === slideIndex ? styles.currentSlide : ''}`}>
            <div className={styles.slideWrap}>
                <h2>{entry.title}</h2>
                <a href={`/portfolio/${entry.slug}`} className={styles.link}>View Details</a>
            </div>
        </div>

    )
}

export default PortfolioShowcaseSlide;