import React from 'react'
import * as styles from './footer.module.css'

const Footer = () => (
  <div className={`container`}>
    <div className={styles.footerWrap}>
      Created by Kennan Smith, Web Developer © {new Date().getFullYear()}
    </div>
  </div>
)

export default Footer
