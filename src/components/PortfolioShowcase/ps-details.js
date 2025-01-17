import React, { useRef } from "react";
import * as styles from "./ps-details.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { get } from "lodash";

const PortfolioShowcaseDetails = ({ entry, index, showDetails, setShowDetails }) => {
  const title = get(entry, 'title', null);
  const body = get(entry, 'body', null);

  const detailsWrapRef = useRef(null);
  const detailsTitleRef = useRef(null);
  const bodyRef = useRef(null);
  // const [bodyHeight, setBodyHeight] = useState('45vh');

  // Note: need to check that window is defined before using it so that the site can be rendered server-side
  // const [windowDimensions, setWindowDimensions] = useState({
  //   width: typeof window !== 'undefined' ? window.innerWidth : 0,
  //   height: typeof window !== 'undefined' ? window.innerHeight : 0,
  // });
  // useEffect(() => {
  //   const handleResize = () => {
  //     // if (typeof window !== 'undefined') {
  //     //   setWindowDimensions({
  //     //     width: window.innerWidth,
  //     //     height: window.innerHeight,
  //     //   });
  //     // };
  //     if (detailsWrapRef.current && detailsTitleRef.current && bodyRef.current) {
  //       const detailsWrapHeight = detailsWrapRef.current.offsetHeight;
  //       const detailsTitleHeight = detailsTitleRef.current.offsetHeight;
  //       const calculatedBodyHeight = detailsWrapHeight - detailsTitleHeight - 500;
  //       setBodyHeight(`${calculatedBodyHeight}px`);
  //     }
  //   }

  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('resize', handleResize);
  //     return () => {
  //       window.removeEventListener('resize', handleResize);
  //     };
  //   }
    
  // }, []);

  const titleLength = title.length;

  const calculateFontSize = (length) => {
    let baseFontSize = 2.5 - (length / 50); // base font size is 2.5rem, but decreases as title length increases
    return `${baseFontSize}rem`;
  };

  const fontSize = calculateFontSize(titleLength);

  return (
    <div ref={detailsWrapRef} className={`${styles.detailsWrap} ${showDetails ? styles.detailsWrapShow : ''}`}>
      <button onClick={() => setShowDetails(false)} className={`button-clean ${styles.closeButton}`}>{`<-- Close Details`}</button>
      <h2 style={{ fontSize }} ref={detailsTitleRef} className={styles.detailsTitle}>{title}</h2>
      <div ref={bodyRef} className={styles.body} 
      
      >
        {renderRichText(body)}
      </div>
    </div>
  );
}

export default PortfolioShowcaseDetails;