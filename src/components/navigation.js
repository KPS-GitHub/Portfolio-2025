import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import useAddRemoveClassInSequence from '../functions/useAddRemoveClassInSequence';

import * as styles from './navigation.module.css'
import "@fontsource/anton";
import {
  FaEnvelope, 
  FaGithub,
  FaPhone 
} from 'react-icons/fa';
import { get } from 'lodash';
import FadeIn from './fadeIn';

const Navigation = ({ me }) => {
  // console.log("me: ", me);
  const email = get(me, 'email', null);
  const phone = get(me, 'phone', null);
  const github = get(me, 'github', null);

  const [letters, setLetters] = useState([]);

  useEffect(() => {
    const letters = document.querySelectorAll(`.${styles.logoLetter}`);
    setLetters(letters);
  }, []);
  useAddRemoveClassInSequence(letters, styles.logoLetterBounce, 1000, 150, 10000);

  return (
    <div className={`container`}>
      <FadeIn delay={200}>
      <nav role="navigation" className={styles.container} aria-label="Main">
        {/* logo */}
        <Link to="/" className={styles.logoLink}>
          <div className={`${styles.navigationItem} ${styles.logo}`}>
            {/* {`KS`} */}
            <span className={`${styles.logoInitialK} ${styles.logoLetter}`}>K</span>
            <span className={styles.logoLetter}>e</span>
            <span className={styles.logoLetter}>n</span>
            <span className={styles.logoLetter}>n</span>
            <span className={styles.logoLetter}>a</span>
            <span className={styles.logoLetter}>n</span>
            &nbsp;
            <span className={`${styles.logoInitialS} ${styles.logoLetter}`}>S</span>
            <span className={styles.logoLetter}>m</span>
            <span className={styles.logoLetter}>i</span>
            <span className={styles.logoLetter}>t</span>
            <span className={styles.logoLetter}>h</span>
          </div>
        </Link>
        {/* links */}
        <div className={styles.linksWrap}>
          {github && <Link to={`${github}`} className={styles.navigationItem}>
            <FaGithub className={`${styles.linkIcon}`} />
          </Link>}
          {email && <Link to={`mailto:${email}`} className={styles.navigationItem}>
        <FaEnvelope className={`${styles.linkIcon}`} />
      </Link>}
          {phone && <Link to={`tel:${phone}`} className={styles.navigationItem}>
        <FaPhone className={`${styles.linkIcon}`} />
      </Link>}
        </div>
      </nav>
      </FadeIn>
    </div>

  )
}

export default Navigation
