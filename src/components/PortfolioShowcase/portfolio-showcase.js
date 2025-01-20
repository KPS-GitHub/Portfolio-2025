import React from "react";
import * as styles from "./portfolio-showcase.module.css";
import PortfolioShowcaseSlider from "./ps-slider";

const PortfolioShowcase = ({ entries }) => {

    return (
        <div className={`${styles.wrap} container`}>
            <PortfolioShowcaseSlider entries={entries}/>
        </div>
    );
}

export default PortfolioShowcase;