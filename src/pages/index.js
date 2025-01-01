import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout'
// import Hero from '../components/hero'
// import ArticlePreview from '../components/article-preview'
import PortfolioShowcase from '../components/PortfolioShowcase/portfolio-showcase'
import AboutMeSec from '../components/about-me';

class RootIndex extends React.Component {
  render() {
    const portEntries = get(this, 'props.data.allContentfulPortfolioEntry.nodes')
    // const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    // const [author] = get(this, 'props.data.allContentfulPerson.nodes')
    const me = get(this, 'props.data.me');

    return (
      <Layout location={this.props.location} me={me}>
        {/* <Hero
          image={author.heroImage.gatsbyImage}
          title={author.name}
          content={author.shortBio}
        /> */}
        <AboutMeSec me={me} />
        <br/>
        <br/>
        <br/>
        <PortfolioShowcase entries={portEntries} />
        {/* <ArticlePreview posts={posts} /> */}
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulPortfolioEntry(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        endTag
        typeTags
        techTags
        featuredImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
          title
        }
        description {
          raw
        }
        body {
          raw
        }
      }
    }
    allContentfulBlogPost(sort: { publishDate: DESC }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      nodes {
        name
        shortBio {
          raw
        }
        title
        heroImage: image {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
        }
      }
    }
    me: contentfulPerson(name: {eq: "Kennan Smith"}) {
      name
      title
      company
      shortBio {
        raw
      }
      email
      phone
      github
      image {
        gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
      }
    }
  }
`
