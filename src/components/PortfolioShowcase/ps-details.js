import React, { useEffect, useRef, useState } from "react";
import * as styles from "./ps-details.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { get } from "lodash";

const PortfolioShowcaseDetails = ({ entry, index, setShowDetails }) => {
  const title = get(entry, 'title', null);
  const body = get(entry, 'body', null);

  const detailsWrapRef = useRef(null);
  const detailsTitleRef = useRef(null);
  const bodyRef = useRef(null);
  const [bodyHeight, setBodyHeight] = useState('auto');

  useEffect(() => {
    if (detailsWrapRef.current && detailsTitleRef.current && bodyRef.current) {
      const detailsWrapHeight = detailsWrapRef.current.offsetHeight;
      const detailsTitleHeight = detailsTitleRef.current.offsetHeight;
      const calculatedBodyHeight = detailsWrapHeight - detailsTitleHeight - 100;
      setBodyHeight(`${calculatedBodyHeight}px`);
    }
  }, []);

  return (
    <div ref={detailsWrapRef} className={styles.detailsWrap}>
      <button onClick={() => setShowDetails(false)} className={`button-clean ${styles.closeButton}`}>{`<-- Close Details`}</button>
      <h2 ref={detailsTitleRef} className={styles.detailsTitle}>{title}</h2>
      <div ref={bodyRef} className={styles.body} style={{ height: bodyHeight }}>
        {renderRichText(body)}
      </div>
    </div>
  );
}

export default PortfolioShowcaseDetails;