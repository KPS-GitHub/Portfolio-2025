import React from "react";
import * as styles from "./portfolio-showcase-details.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";


const PortfolioShowcaseDetails = ({ entry, setShowDetails }) => {
  const { title, body } = entry;
    return (
    <div className={styles.detailsWrap}>
      <button onClick={() => setShowDetails(false)} className={`button-clean ${styles.closeButton}`}>{`<-- Close Details`}</button>
      <h2>{title}</h2>
      <div className={styles.body}>{renderRichText(body)}</div>
    </div>
  );
}

export default PortfolioShowcaseDetails;