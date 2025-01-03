import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import * as styles from "./about-me.module.css";

const AboutMeSec = ({ me }) => {
    // console.log("me: ", me);
    return (
        <div className={`container`}>
            <div className={`row`}>
                <div className={`col-lg-8 col-md-7 col-sm-6 order-sm-1 order-3 ${styles.textWrap}`}>
                    <p className={`${styles.aboutBody} block-accent-blue`}>{renderRichText(me.shortBio)}</p>
                </div>
                <div className={`col-lg-1 col-md-1 col-sm-1 order-sm-2 order-2`}/>
                <div className={`col-lg-3 col-md-4 col-sm-5 order-sm-3 order-1 ${styles.imageWrap}`}>
                    <GatsbyImage className={`${styles.aboutImage} block-accent-pink`} image={me.image.gatsbyImage} alt={me.image.title} />
                </div>
            </div>
        </div>
    )
}

export default AboutMeSec;