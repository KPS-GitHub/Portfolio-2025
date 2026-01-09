import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/montserrat";

import Layout from '../components/layout'
// import Hero from '../components/hero'
// import ArticlePreview from '../components/article-preview'
import PortfolioShowcase from '../components/PortfolioShowcase/portfolio-showcase'
import AboutMeSec from '../components/about-me';
import FadeIn from '../components/fadeIn';
import TagFrequencyChart from '../components/PortfolioShowcase/PortfolioDataVis/ps-tag-freq-chart';

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
        <div className='container'>
          <FadeIn delay={500}>
            <AboutMeSec me={me} />
          </FadeIn>
          <br />
          <br />
          <br />
          <FadeIn delay={750}>
            <PortfolioShowcase entries={portEntries} />
          </FadeIn>
          <br />
          <br />
          <br />
          <FadeIn delay={750}>
            <TagFrequencyChart entries={portEntries} />
          </FadeIn>
          {/* <ArticlePreview posts={posts} /> */}
        </div>

      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulPortfolioEntry(
      sort: { publishDate: DESC }
      filter: { title: { regex: "/^(?!.*schema).*$/i" } }
      ) {
      nodes {
        title
        slug
        websiteUrl
        publishDate(formatString: "MMMM Do, YYYY")
        techTags
        featuredImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 3000
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
      linkedIn
      github
      image {
        gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
      }
    }
  }
`
