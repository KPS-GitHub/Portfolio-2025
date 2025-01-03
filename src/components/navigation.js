import React, { useState, useEffect, useRef } from 'react'
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

  // sticky nav on scroll
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <div ref={navRef} className={`${isSticky ? 'sticky' : ''}`}>
      <div className={`container`}>
        <FadeIn delay={200} order='random'>
          <nav role="navigation" className={styles.container} aria-label="Main">
            {/* logo */}
            <Link to="/" 
            className={`${styles.logoLink} block-accent-pink`}
            // className={styles.logoLink}
            >
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
            <div className={`${styles.linksWrap} block-accent-green`}>
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
  )
}

export default Navigation
