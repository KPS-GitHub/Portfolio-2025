import React from "react";
import * as styles from "./portfolio-showcase.module.css";
import PortfolioShowcaseSlider from "./ps-slider";
import SectionTitle from "../section-title";

const PortfolioShowcase = ({ entries }) => {

    return (
        <div className={styles.outerWrap}>
            <SectionTitle title="Professional Portfolio*" subtitle="*in-progress content loading, many more projects from my career-so-far coming soon" targetId={'portfolio'} />
            <div className={`${styles.wrap} container`}>
                <PortfolioShowcaseSlider entries={entries}/>
            </div>
        </div>
    );
}

export default PortfolioShowcase;