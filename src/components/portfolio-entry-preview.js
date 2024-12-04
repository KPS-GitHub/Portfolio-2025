import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'

const PortfolioEntryPreview = ({ entries }) => {
  if (!entries) return null
  if (!Array.isArray(entries)) return null

  return (
    <Container>
      <ul className={styles.articleList}>
        {entries.map((entry) => {
          return (
            <li key={entry.slug}>
              <Link to={`/portfolio/${entry.slug}`} className={styles.link}>
                <GatsbyImage alt="" image={entry.heroImage.gatsbyImage} />
                <h2 className={styles.title}>{entry.title}</h2>
              </Link>
              <div>
                {entry.description?.raw && renderRichText(entry.description)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{entry.publishDate}</small>
                <Tags tags={entry.tags} />
              </div>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}

export default PortfolioEntryPreview
