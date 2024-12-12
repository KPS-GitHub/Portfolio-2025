import React from 'react'
import PortfolioShowcaseSlide from './portfolio-showcase-slide'
import Slider from '@ant-design/react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PortfolioShowcaseTag from './portfolio-showcase-tag';
import { GatsbyImage } from 'gatsby-plugin-image'
import * as styles from './portfolio-showcase-slider.module.css'


const PortfolioShowcaseSlider = ({ entries }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0)

  if (!entries) return null
  if (!Array.isArray(entries)) return null

  let currSlug;
  let currImg;
  // let currEndTag;
  // let currTypeTags;
  let currTechTags;
  if (entries[currentSlide]) {
    const currSlide = entries[currentSlide];
    currSlug = currSlide.slug;
    currImg = currSlide.featuredImage;
    // currEndTag = currSlide.endTag;
    // currTypeTags = currSlide.typeTags;
    currTechTags = currSlide.techTags;
  }

  // react-slick Slider settings
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
            <a className={styles.previewImageLink} href={`/portfolio/${currSlug}`} >
              <GatsbyImage className={styles.gatsbyImage} fadeIn={true} fadeOut={true} image={currImg.gatsbyImage} alt={currImg.alt} />
            </a>
            <div className={styles.tagsWrap}>
              {/* <PortfolioShowcaseTag tag={currEndTag} /> */}
              {/* {currTypeTags?.map((tag, index) => {
                return <PortfolioShowcaseTag key={index} tag={tag} />
              })} */}
              {currTechTags?.map((tag, index) => {
                return <PortfolioShowcaseTag key={index} tag={tag} />
              })}
            </div>
          </div>
          <div className="col-md-5">
            <Slider {...settings}>
              {entries.map((entry, index) => <PortfolioShowcaseSlide entry={entry} slideIndex={index} currSlide={currentSlide} />)}
            </Slider>
          </div>
        </div>
      </div>
  )
}

export default PortfolioShowcaseSlider
