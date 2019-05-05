import React from 'react'
import PropTypes from 'prop-types'

import { Menu } from '../../semantic'

const LocationCategoryMenu = ({ categories, activeCategory, onCategoryChange }) => (
    <Menu widths={categories.length}>
        {categories
            .map((category, idx) => (
                <Menu.Item
                    key={category}
                    active={activeCategory === idx}
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
    activeCategory: PropTypes.number.isRequired,
    onCategoryChange: PropTypes.func.isRequired
}

export default LocationCategoryMenu
