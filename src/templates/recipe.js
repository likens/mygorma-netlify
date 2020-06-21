import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const RecipeTemplate = ({
  name,
  helmet,
  author,
  date,
  inspiredby,
  preptime,
  cooktime,
  servingsize,
  image,
  ingredients,
  directions
}) => {

  return (
    <section className="recipe recipe--detail">
      {helmet || ''}
      <h1 className="recipe__heading recipe__heading--detail">{name}</h1>
      <div className="recipe__main">
        <div className="recipe__intro">
          <div className="recipe__item recipe__date">
            <div className="recipe__label">Published</div>
            <div className="recipe__value">{date}</div>
          </div>
          <div className="recipe__item recipe__author">
            <div className="recipe__label">Author</div>
            <div className="recipe__value">{author}</div>
          </div>
          <div className="recipe__item recipe__inspired">
            <div className="recipe__label">Inspired by</div>
            <div className="recipe__value">{inspiredby}</div>
          </div>
          <div className="recipe__item recipe__prep">
            <div className="recipe__label">Prep Time</div>
            <div className="recipe__value">{preptime}</div>
          </div>
          <div className="recipe__item recipe__cook">
            <div className="recipe__label">Cook Time</div>
            <div className="recipe__value">{cooktime}</div>
          </div>
          <div className="recipe__item recipe__size">
            <div className="recipe__label">Serving Size</div>
            <div className="recipe__value">{servingsize}</div>
          </div>
        </div>
        <div className="recipe__full">
          <div className="recipe__ingredients">
            <div className="recipe__heading">Ingredients</div>
            <div className="recipe__content">
              <ul className="recipe__ingredients-list">
                <li className="recipe__ingredients-item">TODO: Ingredients</li>
              </ul>
            </div>
          </div>
          <div className="recipe__directions">
            <div className="recipe__heading">Directions</div>
            <div className="recipe__content">
              <ol className="recipe__directions-list">
                <li className="recipe__directions-item">TODO: Directions</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="recipe__back">
        <Link className="recipe__back-link" to="/">
          <span className="recipe__back-icon">
            <svg width="24" height="24" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
          </span>
          <span className="recipe__back-text">Back To Recipes</span>
        </Link>
      </div>
    </section>
  )
}

RecipeTemplate.propTypes = {
  name: PropTypes.string,
  helmet: PropTypes.object,
}

const Recipe = ({ data }) => {
  const { markdownRemark: recipe } = data

  return (
    <Layout>
      <RecipeTemplate
        helmet={
          <Helmet titleTemplate="%s | MyGorma">
            <title>{`${recipe.frontmatter.name}`}</title>
            {/* <meta
              name="description"
              content={`${recipe.frontmatter.description}`}
            /> */}
          </Helmet>
        }
        name={recipe.frontmatter.name}
        author={recipe.frontmatter.author}
        date={recipe.frontmatter.date}
        inspiredby={recipe.frontmatter.inspiredby}
        preptime={recipe.frontmatter.preptime}
        cooktime={recipe.frontmatter.cooktime}
        servingsize={recipe.frontmatter.servingsize}
        image={recipe.frontmatter.image}
        ingredients={recipe.frontmatter.ingredients}
        directions={recipe.frontmatter.directions}
      />
    </Layout>
  )
}

Recipe.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Recipe

export const pageQuery = graphql`
  query RecipeByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        name
        author
        inspiredby
        preptime
        cooktime
        servingsize
        image {
          childImageSharp {
            fluid(maxWidth: 1200, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`