import { GatsbyImage } from "gatsby-plugin-image";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import React from "react";
import * as styles from "./about-me.module.css";

const AboutMeSec = ({ me }) => {
    // console.log("me: ", me);
    return (
        <div className={`container`}>
            <div className={`row`}>
                <div className={`col-lg-9 col-md-8 col-sm-7 order-sm-1 order-2 ${styles.textWrap}`}>
                    <p className={`${styles.aboutBody}`}>{renderRichText(me.shortBio)}</p>
                </div>
                <div className={`col-lg-3 col-md-4 col-sm-5 order-sm-2 order-1 ${styles.imageWrap}`}>
                    <GatsbyImage className={`${styles.aboutImage}`} image={me.image.gatsbyImage} alt={me.image.title} />
                </div>
            </div>
        </div>
    )
}

export default AboutMeSec;