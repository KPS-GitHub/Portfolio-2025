import React from "react";
import * as styles from "./portfolio-showcase.module.css";
import PortfolioShowcaseSlider from "./portfolio-showcase-slider";

const PortfolioShowcase = ({ entries }) => {

    return (
        <div class={styles.wrap}>
            <PortfolioShowcaseSlider entries={entries}/>
        </div>
    );
}

export default PortfolioShowcase;