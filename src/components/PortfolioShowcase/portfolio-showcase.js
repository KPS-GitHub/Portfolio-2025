import React from "react";
import * as styles from "./portfolio-showcase.module.css";
import PortfolioShowcaseSlider from "./ps-slider";
import SectionTitle from "../section-title";

const PortfolioShowcase = ({ entries }) => {

    return (
        <>
            <SectionTitle targetId={'portfolio'} >Portfolio Showcase</SectionTitle>
            <div className={`${styles.wrap} container`}>
                <PortfolioShowcaseSlider entries={entries}/>
            </div>
        </>
    );
}

export default PortfolioShowcase;