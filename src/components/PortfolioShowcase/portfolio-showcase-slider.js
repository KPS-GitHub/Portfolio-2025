import React from 'react'
import PortfolioShowcaseSlide from './portfolio-showcase-slide'
// import { Link } from 'gatsby'
// import { GatsbyImage } from 'gatsby-plugin-image'
// import { renderRichText } from 'gatsby-source-contentful/rich-text'

// import Tags from '../tags'
import Slider from '@ant-design/react-slick'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from 'gatsby-plugin-image'
import * as styles from './portfolio-showcase.module.css'

const PortfolioShowcaseSlider = ({ entries }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  if (!entries) return null
  if (!Array.isArray(entries)) return null

  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    centerPadding: "0px",
    speed: 500,
    focusOnSelect: true,
    vertical: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  }

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <a className={styles.previewImageLink} href={`/portfolio/${entries[currentSlide].slug}`} >
              <GatsbyImage fadeIn={true} image={entries[currentSlide].featuredImage.gatsbyImage} alt={entries[currentSlide].featuredImage.alt} />
            </a>
          </div>
          <div className="col-md-5">
            <Slider {...settings}>
              {entries.map((entry, index) => {
                return (
                  <div key={entry.title} className={`${styles.slideOuterWrap} ${currentSlide === index ? styles.currentSlide : ''}`}>
                    <PortfolioShowcaseSlide entry={entry} />
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
  )
}

export default PortfolioShowcaseSlider
