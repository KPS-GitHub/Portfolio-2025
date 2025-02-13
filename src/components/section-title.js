import React from "react";
import * as styles from "./section-title.module.css";

const SectionTitle = ({ children, targetId }) => {
    const id = targetId ? `${targetId}` : '';
  return (
    <h2 id={id} className={`${styles.sectionTitle} text-2xl font-bold mb-4`} style={{marginLeft: '1rem'}}>{children}</h2>
  );
};

export default SectionTitle;