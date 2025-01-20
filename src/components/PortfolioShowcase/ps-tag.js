import React from "react";
import * as styles from "./ps-tag.module.css";

const PortfolioShowcaseTag = ({ tag, index }) => {
    return (
        <div className={`${styles.tag} block-accent-mini ${index % 2 === 0 ? 'block-accent-green' : 'block-accent-pink'}`}>
            {tag}
        </div>
    );
};

export default PortfolioShowcaseTag;