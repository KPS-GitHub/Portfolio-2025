import React from "react";
import * as styles from "./section-title.module.css";

const SectionTitle = ({ title, subtitle, targetId }) => {
    const id = targetId ? `${targetId}` : '';
  return (
    <div className={`${styles.sectionTitle}`}>
      <h2 id={id} className={`text-2xl font-bold`}>{title}</h2>
      <p>{subtitle}</p>
    </div>
  );
};

export default SectionTitle;