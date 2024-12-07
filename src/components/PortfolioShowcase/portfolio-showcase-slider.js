import React from 'react'
import PortfolioShowcaseSlide from './portfolio-showcase-slide'
// import { Link } from 'gatsby'
// import { GatsbyImage } from 'gatsby-plugin-image'
// import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from '../container'
// import Tags from '../tags'
import * as styles from './portfolio-showcase.module.css'
import Slider from '@ant-design/react-slick'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PortfolioShowcaseSlider = ({ entries }) => {
  if (!entries) return null
  if (!Array.isArray(entries)) return null

  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    infinite: false,
    centerPadding: "60px",
    speed: 500,
    focusOnSelect: true,
    vertical: true
  }

  return (
    <div className={styles.sliderWrap}>
      <Container>
        <Slider {...settings}>
          {entries.map((entry) => {
            console.log("entry: ", entry);
            return (
              <div key={entry.title}>
                <PortfolioShowcaseSlide entry={entry} />
              </div>
            )
          })}
        </Slider>


        {/* <ul className={styles.articleList}>
        {entries.map((entry) => {
          return (
            <li key={entry.slug}>
              <Link to={`/portfolio/${entry.slug}`} className={styles.link}>
                <GatsbyImage alt="" image={entry.heroImage.gatsbyImage} />
                <h2 className={styles.title}>{entry.title}</h2>
              </Link>
              <div>
                {entry.description?.raw && renderRichText(entry.description)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{entry.publishDate}</small>
                <Tags tags={entry.tags} />
              </div>
            </li>
          )
        })}
      </ul> */}
      </Container>
    </div>
  )
}

export default PortfolioShowcaseSlider
