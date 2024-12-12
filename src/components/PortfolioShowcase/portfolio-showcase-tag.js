import React from "react";
import * as styles from "./portfolio-showcase-tag.module.css";

const PortfolioShowcaseTag = ({ tag }) => {
    return (
        <div className={styles.tag}>
            {tag}
        </div>
    );
};

export default PortfolioShowcaseTag;