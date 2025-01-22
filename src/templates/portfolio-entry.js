import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import readingTime from 'reading-time'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
// import Tags from '../components/tags'
import * as styles from './portfolio-entry.module.css'

class PortfolioEntryTemplate extends React.Component {
  render() {
    const entry = get(this.props, 'data.contentfulPortfolioEntry')
    const previous = get(this.props, 'data.previous')
    const next = get(this.props, 'data.next')
    const plainTextDescription = documentToPlainTextString(
      JSON.parse(entry.description.raw)
    )
    const plainTextBody = documentToPlainTextString(JSON.parse(entry.body.raw))
    const { minutes: timeToRead } = readingTime(plainTextBody)
    
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImage)}
              alt={description}
           />
         )
        },
      },
    };

    return (
      <Layout location={this.props.location}>
        <Seo
          title={entry.title}
          description={plainTextDescription}
          image={`http:${entry.featuredImage.resize.src}`}
        />
        <Hero
          image={entry.featuredImage?.gatsbyImage}
          title={entry.title}
          content={entry.description}
        />
        <div className={styles.container}>
          <span className={styles.meta}>
            {entry.author?.name} &middot;{' '}
            <time dateTime={entry.rawDate}>{entry.publishDate}</time> –{' '}
            {timeToRead} minute read
          </span>
          <div className={styles.article}>
            <div className={styles.body}>
              {entry.body?.raw && renderRichText(entry.body, options)}
            </div>
            {/* <Tags tags={entry.tags} /> */}
            {(previous || next) && (
              <nav>
                <ul className={styles.articleNavigation}>
                  {previous && (
                    <li>
                      <Link to={`/blog/${previous.slug}`} rel="prev">
                        ← {previous.title}
                      </Link>
                    </li>
                  )}
                  {next && (
                    <li>
                      <Link to={`/blog/${next.slug}`} rel="next">
                        {next.title} →
                      </Link>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PortfolioEntryTemplate

export const pageQuery = graphql`
  query PortfolioEntryBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulPortfolioEntry(slug: { eq: $slug }) {
      slug
      title
      description {
        raw
      }
      author {
        name
      }
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
      featuredImage {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 630, width: 1200) {
          src
        }
      }
      body {
        raw
      }
      techTags
    }
    previous: contentfulPortfolioEntry(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulPortfolioEntry(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`
