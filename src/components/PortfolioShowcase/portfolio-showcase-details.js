import React from "react";
import * as styles from "./portfolio-showcase-details.module.css";


const PortfolioShowcaseDetails = ({ entry, showDetails, setShowDetails }) => {
    return (
    <div className={styles.detailsWrap}>
        {/* TODO 
            - fix bug where clicking the "View Details" button on a slide causes the image to fade out and in
            - fade out/in for switching between slider and details
            - flesh out markup with entry data 
            - add styles
        */}
        <button onClick={() => setShowDetails(false)} className={`button-clean`}>{`<-- Close Details`}</button>
      <h1>PortfolioShowcaseDetails</h1>
    </div>
  );
}

export default PortfolioShowcaseDetails;