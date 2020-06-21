import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class RecipeRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: recipes } = data.allMarkdownRemark

    return (

      <div className="recipes__list">
        {recipes &&
          recipes.map(({ node: recipe }) => (
            <div className="recipe" key={recipe.id}>
              <Link className="recipe__link" to={recipe.fields.slug}>
                <div className="recipe__heading recipe__heading--list">{recipe.frontmatter.name}</div>
                <div className="recipe__info">
                  <div className="recipe__date">{recipe.frontmatter.date}</div>
                  {recipe.frontmatter.author ? (
                    <div className="recipe__author recipe__author--list">- {recipe.frontmatter.author}</div>
                  ) : null}
                </div>
                <div className="recipe__icon">
                  <svg className="receipe__svg" width="24" height="24" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </div>
              </Link>
            </div>
          ))}
      </div>

      // <div className="columns is-multiline">
      //   {posts &&
      //     posts.map(({ node: post }) => (
      //       <div className="is-parent column is-6" key={post.id}>
      //         <article
      //           className={`blog-list-item tile is-child box notification ${
      //             post.frontmatter.featuredpost ? 'is-featured' : ''
      //           }`}
      //         >
      //           <header>
      //             {post.frontmatter.featuredimage ? (
      //               <div className="featured-thumbnail">
      //                 <PreviewCompatibleImage
      //                   imageInfo={{
      //                     image: post.frontmatter.featuredimage,
      //                     alt: `featured image thumbnail for post ${post.frontmatter.title}`,
      //                   }}
      //                 />
      //               </div>
      //             ) : null}
      //             <p className="post-meta">
      //               <Link
      //                 className="title has-text-primary is-size-4"
      //                 to={post.fields.slug}
      //               >
      //                 {post.frontmatter.title}
      //               </Link>
      //               <span> &bull; </span>
      //               <span className="subtitle is-size-5 is-block">
      //                 {post.frontmatter.date}
      //               </span>
      //             </p>
      //           </header>
      //           <p>
      //             {post.excerpt}
      //             <br />
      //             <br />
      //             <Link className="button" to={post.fields.slug}>
      //               Keep Reading →
      //             </Link>
      //           </p>
      //         </article>
      //       </div>
      //     ))}
      // </div>
    )
  }
}

RecipeRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query RecipeRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "recipe" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                name
                templateKey
                date(formatString: "MMMM DD, YYYY")
                author
                image {
                  childImageSharp {
                    fluid(maxWidth: 600, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <RecipeRoll data={data} count={count} />}
  />
)
