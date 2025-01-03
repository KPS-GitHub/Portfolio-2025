import React from "react";
import * as styles from "./portfolio-showcase-tag.module.css";

const PortfolioShowcaseTag = ({ tag, index }) => {
    return (
        <div className={`${styles.tag} ${index % 2 === 0 ? 'block-accent-green' : 'block-accent-pink'}`}>
            {tag}
        </div>
    );
};

export default PortfolioShowcaseTag;