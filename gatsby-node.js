const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define templates
  const portfolioEntry = path.resolve('./src/templates/portfolio-entry.js')
  const blogPost = path.resolve('./src/templates/blog-post.js')

  const result = await graphql(
    `
      {
        allContentfulPortfolioEntry {
          nodes {
            title
            slug
          }
        }
        allContentfulBlogPost {
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

  const portfolioEntries = result.data.allContentfulPortfolioEntry.nodes
  const posts = result.data.allContentfulBlogPost.nodes

  
  // // Create portfolio entry pages
  // // But only if there's at least one portfolio entry found in Contentful
  // // `context` is available in the template as a prop and as a variable in GraphQL

  // if (portfolioEntries.length > 0) {
  //   portfolioEntries.forEach((entry, index) => {
  //     const previousPostSlug = index === 0 ? null : portfolioEntries[index - 1].slug
  //     const nextPostSlug =
  //       index === portfolioEntries.length - 1 ? null : portfolioEntries[index + 1].slug

  //     createPage({
  //       path: `/portfolio/${entry.slug}/`,
  //       component: portfolioEntry,
  //       context: {
  //         slug: entry.slug,
  //         previousPostSlug,
  //         nextPostSlug,
  //       },
  //     })
  //   })
  // }
  
  
  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }
}
