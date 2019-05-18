import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Menu } from '../../semantic'
import CONFIG from '../../config'

const WPTypeMenu = ({ categories, activeCategoryIndex, onCategoryChange }) => (
    <Menu widths={categories.length} size="mini">
        {categories
            .map((category, idx) => (
                <Menu.Item
                    key={category}
                    active={activeCategoryIndex === idx}
                    onClick={() => onCategoryChange(idx)}
                >
                    <Icon name={CONFIG.icons[category]} />
                    {category}
                </Menu.Item>
            ))
        }
    </Menu>
)

WPTypeMenu.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeCategoryIndex: PropTypes.number,
    onCategoryChange: PropTypes.func.isRequired
}

WPTypeMenu.defaultProps = {
    activeCategoryIndex: 0
}

export default WPTypeMenu
