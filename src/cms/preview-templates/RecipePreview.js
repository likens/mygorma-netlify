import React from 'react'
import PropTypes from 'prop-types'
import { RecipeTemplate } from '../../templates/recipe'

const RecipePreview = ({ entry, widgetFor }) => {
  return (
    <RecipeTemplate />
  )
}

RecipePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default RecipePreview
