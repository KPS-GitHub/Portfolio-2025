import React from "react";
import * as styles from "./portfolio-showcase.module.css";
import PortfolioShowcasePreview from "./portfolio-showcase-preview";
import PortfolioShowcaseSlider from "./portfolio-showcase-slider";

const PortfolioShowcase = ({ entries }) => {

    return (
        <div class={styles.wrap}>
            <PortfolioShowcasePreview />
            <PortfolioShowcaseSlider entries={entries}/>
        </div>
    );
}

export default PortfolioShowcase;