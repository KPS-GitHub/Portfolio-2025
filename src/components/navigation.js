import React from 'react'
import { Link } from 'gatsby'

import * as styles from './navigation.module.css'
import "@fontsource/anton";

const Navigation = () => (
  <div className={`container`}>
<nav role="navigation" className={styles.container} aria-label="Main">
    <Link to="/" className={styles.logoLink}>
      <div className={`${styles.navigationItem} ${styles.logo}`}>{`KS`}</div>
    </Link>
    {/* <ul className={styles.navigation}>
      <li className={styles.navigationItem}>
        <Link to="/" activeClassName="active">
          Home
        </Link>
      </li>
      <li className={styles.navigationItem}>
        <Link to="/blog/" activeClassName="active">
          Blog
        </Link>
      </li>
    </ul> */}
  </nav>
  </div>
  
)

export default Navigation
