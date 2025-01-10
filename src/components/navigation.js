import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import useAddRemoveClassInSequence from '../functions/useAddRemoveClassInSequence';

import * as styles from './navigation.module.css'
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

  // compact nav on scroll
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    const isSmallScreen = window.innerWidth < 768;
    setIsCompact(isSmallScreen);
  
    const handleScroll = () => {
      const blockAccentElements = document.querySelectorAll('.block-accent-target-class');
      // Only update isCompact if we're not on a small screen
      if (!isSmallScreen) {
        setIsCompact(window.scrollY > 0);
      }
      
      // Handle accent classes separately
      if (window.scrollY > 0) {
        blockAccentElements.forEach(element => {
          element.classList.add('hide-accent');
        });
      } else {
        blockAccentElements.forEach(element => {
          element.classList.remove('hide-accent');
        });
      }
    };
  
    const handleResize = () => {
      const isNowSmallScreen = window.innerWidth < 410;
      if (isNowSmallScreen) {
        setIsCompact(true);
      } else {
        setIsCompact(window.scrollY > 0);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // bounce animation
  const [letters, setLetters] = useState([]);
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const letters = document.querySelectorAll(`.${styles.logoLetter}`);
    setLetters(letters);
    const links = document.querySelectorAll(`.${styles.navIconLink}`);
    setLinks(links);
  }, []);
  useAddRemoveClassInSequence(letters, styles.logoLetterBounce, 3000, 150, 30000);
  useAddRemoveClassInSequence(links, styles.navIconLinkBounce, 5500, 200, 30000);

  return (
    <div className={`${styles.fixedNav} ${isCompact ? styles.compactNav : ''}`}>
      <div className={`container`}>
        <div className={`${styles.navOuterWrap}`}>
          <FadeIn delay={200} order='random'>
            <nav role="navigation" aria-label="Main">
              {/* logo */}
              <Link to="/"
                className={`${styles.logoLink} block-accent-pink block-accent-target-class`}
              // className={styles.logoLink}
              >
                <div className={`${styles.navigationItem} ${styles.logo}`}>
                  <span className={`${styles.logoInitial} ${styles.logoInitialK} ${styles.logoLetter}`}>K</span>
                  <span className={styles.logoLetter}>e</span>
                  <span className={styles.logoLetter}>n</span>
                  <span className={styles.logoLetter}>n</span>
                  <span className={styles.logoLetter}>a</span>
                  <span className={styles.logoLetter}>n</span>
                  &nbsp;
                  <span className={`${styles.logoSlash}`}>/</span>
                  &nbsp;
                  <span className={`${styles.logoInitial} ${styles.logoInitialS} ${styles.logoLetter}`}>S</span>
                  <span className={styles.logoLetter}>m</span>
                  <span className={styles.logoLetter}>i</span>
                  <span className={styles.logoLetter}>t</span>
                  <span className={styles.logoLetter}>h</span>
                </div>
              </Link>
              {/* links */}
              <div className={`${styles.linksWrap} block-accent-green block-accent-target-class`}>
                {github && <Link to={`${github}`} target='_blank' rel="noreferrer" className={`${styles.navIconLink} ${styles.navigationItem}`}>
                  <FaGithub className={`${styles.linkIcon}`} />
                </Link>}
                {email && <a href={`mailto:${email}`} target='_blank' rel="noreferrer" className={`${styles.navIconLink} ${styles.navigationItem}`}>
                  <FaEnvelope className={`${styles.linkIcon}`} />
                </a>}
                {phone && <a href={`tel:${phone}`} target='_blank' rel="noreferrer" className={`${styles.navIconLink} ${styles.navigationItem}`}>
                  <FaPhone className={`${styles.linkIcon}`} />
                </a>}
              </div>
            </nav>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}

export default Navigation
