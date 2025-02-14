import path from 'path'
import type { GatsbyNode } from 'gatsby'

// base data type
interface PortfolioEntry {
  title: string
  slug: string
}

// query structure
interface PortfolioEntryQuery {
  allContentfulPortfolioEntry: {
    nodes: PortfolioEntry[]
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define templates
  const portfolioEntry = path.resolve('./src/templates/portfolio-entry.tsx')

  const result = await graphql<{ data: PortfolioEntryQuery }>(
    `
      {
        allContentfulPortfolioEntry {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const portfolioEntries = result.data?.data?.allContentfulPortfolioEntry.nodes || []

  // Note: Keeping the commented code for reference, but converted to TypeScript
  /*
  if (portfolioEntries.length > 0) {
    portfolioEntries.forEach((entry, index) => {
      const previousPostSlug = index === 0 ? null : portfolioEntries[index - 1].slug
      const nextPostSlug =
        index === portfolioEntries.length - 1 ? null : portfolioEntries[index + 1].slug

      createPage({
        path: `/portfolio/${entry.slug}/`,
        component: portfolioEntry,
        context: {
          slug: entry.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
  */
}