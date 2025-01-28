import React, { useRef, useState, useEffect } from "react";
import * as styles from "./ps-details.module.css";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { INLINES } from '@contentful/rich-text-types';
import { get } from "lodash";

const options = {
    renderNode: {
      [INLINES.HYPERLINK]: (node, children) => {
        const { uri } = node.data;
        const isExternal = !uri.startsWith('#');
        return (
          <a href={uri} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} className="dotted-anchor">
            {children}
          </a>
        );
      },
    },
  };

const PortfolioShowcaseDetails = ({ entry, index, showDetails, setShowDetails }) => {
  const title = get(entry, 'title', null);
  const body = get(entry, 'body', null);

  const detailsWrapRef = useRef(null);
  const detailsTitleRef = useRef(null);
  const bodyRef = useRef(null);

  // Note: need to check that window is defined before using it so that the site can be rendered server-side
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    
  }, []);

  const titleLength = title.length;

  // base font size is 2.5rem, but decreases as title length increases and as the window size decreases
  const calculateFontSize = (length, windowWidth, windowHeight) => {
    let baseFontSize = 2.5 - (length / 50); 
    if (windowWidth <= 355 || windowHeight <= 300) return `${baseFontSize - 1}rem`;
    if (windowWidth <= 455 || windowHeight <= 400) return `${baseFontSize - .75}rem`;
    if (windowWidth <= 991 || windowHeight <= 700) return `${baseFontSize - .5}rem`;
    return `${baseFontSize}rem`;
  };

  const fontSize = calculateFontSize(titleLength, windowDimensions.width, windowDimensions.height);

  return (
    <div ref={detailsWrapRef} className={`${styles.detailsWrap} ${showDetails ? styles.detailsWrapShow : ''}`}>
      <button onClick={() => setShowDetails(false)} className={`button-clean ${styles.closeButton}`}>{`<-- Close Details`}</button>
      <h2 style={{ fontSize }} ref={detailsTitleRef} className={styles.detailsTitle}>{title}</h2>
      <div ref={bodyRef} className={styles.body}>
        {renderRichText(body, options)}
      </div>
    </div>
  );
}

export default PortfolioShowcaseDetails;