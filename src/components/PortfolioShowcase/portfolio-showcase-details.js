import React from "react";
import * as styles from "./portfolio-showcase-details.module.css";


const PortfolioShowcaseDetails = ({ entry, setShowDetails }) => {
    return (
    <div className={styles.detailsWrap}>
        <button onClick={() => setShowDetails(false)} className={`button-clean`}>{`<-- Close Details`}</button>
      <h1>PortfolioShowcaseDetails</h1>
    </div>
  );
}

export default PortfolioShowcaseDetails;