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
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {name}
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}

RecipeTemplate.propTypes = {
  name: PropTypes.string,
  helmet: PropTypes.object,
}

const Recipe = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <RecipeTemplate
        helmet={
          <Helmet titleTemplate="%s | MyGorma">
            <title>{`${post.frontmatter.name}`}</title>
            {/* <meta
              name="description"
              content={`${post.frontmatter.description}`}
            /> */}
          </Helmet>
        }
        name={post.frontmatter.name}
        // author={post.frontmatter.author}
        // date={post.frontmatter.date}
        // inspiredby={post.frontmatter.inspiredby}
        // preptime={post.frontmatter.preptime}
        // cooktime={post.frontmatter.cooktime}
        // servingsize={post.frontmatter.servingsize}
        // image={post.frontmatter.image}
        // ingredients={post.frontmatter.ingredients}
        // directions={post.frontmatter.directions}
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
        
      }
    }
  }
`
// author
//         inspiredby
//         preptime
//         cooktime
//         servingsize
//         ingredients
//         directions