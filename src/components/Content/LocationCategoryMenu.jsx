import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from '../../semantic'

const LocationCategoryMenu = ({ categories, activeCategoryIndex, onCategoryChange }) => (
    <Menu widths={categories.length}>
        {categories
            .map((category, idx) => (
                <Menu.Item
                    key={category}
                    active={activeCategoryIndex === idx}
                    onClick={() => onCategoryChange(idx)}
                >
                    {category}
                </Menu.Item>
            ))
        }
    </Menu>
)

LocationCategoryMenu.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeCategoryIndex: PropTypes.number,
    onCategoryChange: PropTypes.func.isRequired
}

LocationCategoryMenu.defaultProps = {
    activeCategoryIndex: 0
}

export default LocationCategoryMenu
