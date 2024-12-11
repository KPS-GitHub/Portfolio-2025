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

const PortfolioShowcaseSlider = ({ entries }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

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
    vertical: true,
    beforeChange: (current, next) => setCurrentSlide(next),
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <GatsbyImage image={entries[currentSlide].featuredImage.gatsbyImage} alt={entries[currentSlide].featuredImage.alt} />
          </div>
          <div className="col-md-6">
            <Slider {...settings}>
              {entries.map((entry) => {
                return (
                  <div key={entry.title}>
                    <PortfolioShowcaseSlide entry={entry} />
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioShowcaseSlider
