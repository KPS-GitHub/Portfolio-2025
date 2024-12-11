import React from 'react'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
// import * as styles from './portfolio-showcase-slider.module.css'

const PortfolioShowcaseSlide = ({ entry }) => {
    return(
        <div>
            <h2>{entry.title}</h2>
            <p>{entry.description?.raw && renderRichText(entry.description)}</p>
        </div>
    )
}

export default PortfolioShowcaseSlide;