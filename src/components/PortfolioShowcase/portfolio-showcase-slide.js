import React from 'react'
import * as styles from './portfolio-showcase.module.css'

const PortfolioShowcaseSlide = ({ entry }) => {

    return (
        <div className={styles.slideWrap}>
            <h2>{entry.title}</h2>
            <a href={`/portfolio/${entry.slug}`} className={styles.link}>View Details</a>
        </div>
    )
}

export default PortfolioShowcaseSlide;