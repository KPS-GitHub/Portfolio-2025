import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'
import "@fontsource/anton";
import {
  FaEnvelope, 
  FaGithub,
  FaPhone 
} from 'react-icons/fa';
import { get } from 'lodash';

const Navigation = ({ me }) => {
  // console.log("me: ", me);
  const email = get(me, 'email', null);
  const phone = get(me, 'phone', null);
  const github = get(me, 'github', null);
  return (
    <div className={`container`}>
      <nav role="navigation" className={styles.container} aria-label="Main">
        {/* logo */}
        <Link to="/" className={styles.logoLink}>
          <div className={`${styles.navigationItem} ${styles.logo}`}>{`KS`}</div>
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
    </div>

  )
}

export default Navigation
