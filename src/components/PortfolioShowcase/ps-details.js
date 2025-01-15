import React from "react";
import * as styles from "./ps-details.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { get } from "lodash";


const PortfolioShowcaseDetails = ({ entry, index, setShowDetails }) => {
  const title = get(entry, 'title', null);
  const body = get(entry, 'body', null);
    return (
    <div className={styles.detailsWrap}>
      <button onClick={() => setShowDetails(false)} className={`button-clean ${styles.closeButton} `}>{`<-- Close Details`}</button>
      <h2>{title}</h2>
      <div className={styles.body}>{renderRichText(body)}</div>
    </div>
  );
}

export default PortfolioShowcaseDetails;